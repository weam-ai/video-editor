"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { trimVideo, mergeSameCodec, addTextOverlay, replaceAudio, exportAs } from '@/lib/videoOps';
import { downloadBlob } from '@/lib/ffmpegClient';

export default function EditorPage() {
  const { videoId } = useParams();
  const router = useRouter();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);
  const [draggingTrim, setDraggingTrim] = useState(null); // 'start' | 'end' | null
  const [draggingPlayhead, setDraggingPlayhead] = useState(false);
  const [segments, setSegments] = useState([]);
  const [working, setWorking] = useState('');
  const [resultURL, setResultURL] = useState(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE || "";
    const fetchOne = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${base}/api/videos/`);
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        const v = (data.videos || []).find((x) => x.videoId === videoId);
        if (!v) throw new Error("Video not found");
        setVideo(v);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [videoId]);

  const onLoaded = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
    setTrimEnd(videoRef.current.duration || 0);
  };

  // keep playback constrained to [trimStart, trimEnd]
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const start = trimStart;
      const end = (trimEnd ?? duration) || 0;
      let t = v.currentTime || 0;
      if (t < start) {
        v.currentTime = start;
        t = start;
      }
      if (t > end) {
        // loop inside range while playing
        if (!v.paused) {
          v.currentTime = start;
          t = start;
        } else {
          v.currentTime = end;
          t = end;
        }
      }
      setCurrentTime(t);
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, [trimStart, trimEnd, duration]);

  // when trims change, snap the playhead inside the range
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const end = trimEnd ?? duration;
    if (v.currentTime < trimStart) {
      v.currentTime = trimStart;
      setCurrentTime(trimStart);
    } else if (v.currentTime > end) {
      v.currentTime = end;
      setCurrentTime(end);
    }
  }, [trimStart, trimEnd, duration]);
  // timeline interactions
  useEffect(() => {
    const onMove = (e) => {
      if (!timelineRef.current || duration <= 0) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, x / rect.width));
      const t = ratio * duration;
      if (draggingTrim === 'start') {
        const newStart = Math.min(Math.max(0, t), (trimEnd ?? duration));
        setTrimStart(newStart);
        if (videoRef.current && videoRef.current.currentTime < newStart) {
          videoRef.current.currentTime = newStart;
          setCurrentTime(newStart);
        }
      } else if (draggingTrim === 'end') {
        const newEnd = Math.max(Math.min(duration, t), trimStart);
        setTrimEnd(newEnd);
        if (videoRef.current && videoRef.current.currentTime > newEnd) {
          videoRef.current.currentTime = newEnd;
          setCurrentTime(newEnd);
        }
      } else if (draggingPlayhead) {
        if (videoRef.current) {
          videoRef.current.currentTime = t;
          setCurrentTime(t);
        }
      }
    };
    const onUp = () => {
      if (draggingTrim) setDraggingTrim(null);
      if (draggingPlayhead) setDraggingPlayhead(false);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [draggingTrim, draggingPlayhead, duration, trimStart, trimEnd]);

  const onRulerClick = (e) => {
    if (!timelineRef.current || duration <= 0) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const t = Math.max(0, Math.min(1, ratio)) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = t;
      setCurrentTime(t);
    }
  };

  const handleSave = async () => {
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "";
      const payload = {
        trimStart,
        trimEnd: trimEnd ?? duration,
        segments: segments.map(s => ({ start: s.start, end: s.end, duration: Math.max(0, s.end - s.start) })),
        outputFormat: "mp4",
        originalDuration: duration,
        editedDuration: Math.max(0, (trimEnd ?? duration) - trimStart),
      };
      const res = await fetch(`${base}/api/videos/${videoId}/process-edits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save edits");
      alert("Edits saved. Processing started.");
    } catch (e) {
      alert(e.message);
    }
  };

  // Actions wired to FFmpeg
  const doTrimExport = async () => {
    if (!video) return;
    setWorking('Trimming...');
    const file = await (await fetch(src)).blob();
    const out = await trimVideo(new File([file], 'in.mp4'), trimStart, trimEnd ?? duration);
    const url = URL.createObjectURL(out); setResultURL(url);
    setWorking('');
  };

  const doText = async () => {
    if (!video) return; setWorking('Adding text...');
    const file = await (await fetch(src)).blob();
    const out = await addTextOverlay(new File([file], 'in.mp4'), 'Sample Text', { y: '50', x: '(w-text_w)/2', start: trimStart, end: trimEnd ?? duration });
    const url = URL.createObjectURL(out); setResultURL(url); setWorking('');
  };

  const doReplaceAudio = async (audioFile) => {
    if (!video) return; setWorking('Replacing audio...');
    const file = await (await fetch(src)).blob();
    const out = await replaceAudio(new File([file], 'in.mp4'), audioFile);
    const url = URL.createObjectURL(out); setResultURL(url); setWorking('');
  };

  const doExportWebM = async () => {
    if (!video) return; setWorking('Exporting...');
    const file = await (await fetch(src)).blob();
    const out = await exportAs(new File([file], 'in.mp4'), 'webm');
    const url = URL.createObjectURL(out); setResultURL(url); setWorking('');
  };

  const splitAtPlayhead = () => {
    const t = currentTime;
    const start = trimStart;
    const end = trimEnd ?? duration;
    if (t <= start || t >= end) return;
    if (segments.length === 0) {
      setSegments([{ start, end: t }, { start: t, end }]);
      return;
    }
    const idx = segments.findIndex(s => t > s.start && t < s.end);
    if (idx === -1) return;
    const s = segments[idx];
    const left = { start: s.start, end: t };
    const right = { start: t, end: s.end };
    const next = [...segments.slice(0, idx), left, right, ...segments.slice(idx+1)]
      .map(s => ({ start: Math.max(start, s.start), end: Math.min(end, s.end) }))
      .filter(s => s.end > s.start)
      .sort((a,b)=>a.start-b.start);
    setSegments(next);
  };

  const removeSegment = (i) => setSegments(segments.filter((_,idx)=>idx!==i));

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const src = video?.videoUrls?.[0] || video?.videoUrl || "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-4 card">
        <video
          ref={videoRef}
          src={src}
          controls
          className="w-full rounded"
          onLoadedMetadata={onLoaded}
          onPlay={() => {
            const v = videoRef.current; if (!v) return; const end = trimEnd ?? duration; if (v.currentTime < trimStart || v.currentTime >= end) { v.currentTime = trimStart; setCurrentTime(trimStart); }
          }}
        />
        <div className="mt-4 space-y-3">
          <div className="text-sm text-gray-700">Time: {currentTime.toFixed(2)}s / {duration.toFixed(2)}s</div>
          {/* CapCut-style timeline with draggable handles */}
          <div className="space-y-2">
            <div ref={timelineRef} onClick={onRulerClick} className="relative h-6 rounded bg-gray-200 cursor-pointer select-none">
              {/* ticks */}
              <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] text-gray-500">
                {Array.from({ length: Math.ceil(duration) + 1 }, (_, i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>
              {/* playhead */}
              <div
                onMouseDown={(e)=>{ e.stopPropagation(); setDraggingPlayhead(true); }}
                className="absolute top-0 bottom-0 w-[2px] bg-red-500"
                style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}
              />
              {/* trim handles */}
              {trimEnd != null && (
                <>
                  <div
                    onMouseDown={(e)=>{ e.stopPropagation(); setDraggingTrim('start'); }}
                    title={`In: ${trimStart.toFixed(2)}s`}
                    className="absolute top-0 bottom-0 w-2 -ml-1 bg-black rounded cursor-ew-resize"
                    style={{ left: `${(trimStart / (duration || 1)) * 100}%` }}
                  />
                  <div
                    onMouseDown={(e)=>{ e.stopPropagation(); setDraggingTrim('end'); }}
                    title={`Out: ${(trimEnd ?? duration).toFixed(2)}s`}
                    className="absolute top-0 bottom-0 w-2 -ml-1 bg-black rounded cursor-ew-resize"
                    style={{ left: `${((trimEnd ?? duration) / (duration || 1)) * 100}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 bg-black/10 pointer-events-none"
                    style={{
                      left: `${(trimStart / (duration || 1)) * 100}%`,
                      width: `${(((trimEnd ?? duration) - trimStart) / (duration || 1)) * 100}%`
                    }}
                  />
                </>
              )}
            </div>
          </div>
          {/* Segment pills */}
          {segments.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs">
              {segments.map((s, i) => (
                <div key={i} className="px-2 py-1 border rounded bg-white text-black">
                  {s.start.toFixed(2)}s → {s.end.toFixed(2)}s
                  <button className="ml-2 text-red-600" onClick={()=>removeSegment(i)}>×</button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button className="btn-primary" onClick={handleSave}>Save</button>
            <button className="btn" onClick={splitAtPlayhead}>Split</button>
            <button className="btn" onClick={()=>router.push("/history")}>Back</button>
          </div>
        </div>
      </div>
      <div className="p-4 card">
        <h2 className="text-lg font-semibold mb-2">Details</h2>
        <div className="text-sm space-y-1">
          <div><span className="font-medium">Title:</span> {video.title || video.prompt?.slice(0,50)}</div>
          <div><span className="font-medium">Status:</span> {video.status}</div>
          <div><span className="font-medium">Duration:</span> {video.duration}s</div>
          <div><span className="font-medium">Aspect:</span> {video.aspectRatio}</div>
          {src && (<a className="btn mt-2 inline-block" href={src} target="_blank">Download</a>)}
        </div>
        <div className="mt-4 space-y-2">
          {working && <div className="text-xs text-gray-600">{working}</div>}
          <div className="flex flex-wrap gap-2">
            <button className="btn" onClick={doTrimExport}>Trim Export</button>
            <button className="btn" onClick={doText}>Add Text</button>
            <label className="btn">
              Replace Audio
              <input type="file" accept="audio/*" hidden onChange={(e)=>{ const f=e.target.files?.[0]; if(f) doReplaceAudio(f); }}/>
            </label>
            <button className="btn" onClick={doExportWebM}>Export WebM</button>
          </div>
          {resultURL && (
            <div className="space-y-2">
              <video src={resultURL} controls className="w-full rounded" />
              <button className="btn-primary" onClick={()=>downloadBlob(new Blob(), 'result.mp4')}>Download Result (use context menu if blocked)</button>
              <a className="btn" href={resultURL} download>Download via Link</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

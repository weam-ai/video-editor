"use client";
import { useEffect, useState } from "react";

function Generator({ onGenerated }) {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(5);
  const [aspect, setAspect] = useState("16:9");
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    try {
      setLoading(true);
      const base = process.env.NEXT_PUBLIC_API_BASE || "";
      const res = await fetch(`${base}/api/videos/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, duration, aspectRatio: aspect })
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data = await res.json();
      onGenerated?.(data.video);
      setPrompt("");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Generate Video</h2>
      <textarea className="w-full p-3 bg-white text-black border rounded" rows={5} placeholder="Describe your video idea..." value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
      <div className="flex gap-3">
        <input type="number" min={1} className="w-24 p-2 bg-white text-black border rounded" value={duration} onChange={(e)=>setDuration(parseInt(e.target.value||"5"))} />
        <select className="p-2 bg-white text-black border rounded" value={aspect} onChange={(e)=>setAspect(e.target.value)}>
          <option>16:9</option>
          <option>9:16</option>
          <option>1:1</option>
        </select>
        <button onClick={submit} disabled={loading} className="px-4 py-2 bg-black text-white rounded">{loading?"Generating...":"Generate"}</button>
      </div>
    </div>
  );
}

function HistoryPanel() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const base = process.env.NEXT_PUBLIC_API_BASE || "";
      const res = await fetch(`${base}/api/videos/`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };
  useEffect(()=>{ fetchVideos(); const id=setInterval(fetchVideos,10000); return ()=>clearInterval(id); },[]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">History</h2>
      <div className="space-y-2 max-h-[70vh] overflow-auto">
        {videos.map(v=> (
          <div key={v.videoId} className="p-3 border rounded flex items-center justify-between bg-white text-black">
            <div className="truncate">
              <div className="font-medium truncate max-w-[320px]">{v.title || v.prompt}</div>
              <div className="text-xs text-gray-600">{v.status} · {v.duration}s · {v.aspectRatio}</div>
            </div>
            <div className="flex gap-2">
              {v.status === 'SUCCEEDED' && v.videoUrls?.[0] && (
                <a className="px-3 py-1 bg-black text-white rounded text-sm" href={`/editor/${v.videoId}`}>Edit</a>
              )}
              {v.videoUrls?.[0] && <a className="px-3 py-1 border rounded text-sm" target="_blank" href={v.videoUrls[0]}>Download</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GenerateSplitPage(){
  const [last, setLast] = useState(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6">
        <Generator onGenerated={setLast} />
        {last && (
          <div className="mt-4 text-sm text-gray-600">Started job: {last.videoId}</div>
        )}
      </div>
      <div className="p-6">
        <HistoryPanel />
      </div>
    </div>
  );
}



"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HistoryPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const base = process.env.NEXT_PUBLIC_API_BASE || "";
        const res = await fetch(`${base}/api/videos/`);
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">History</h1>
        <div className="flex gap-2 text-sm">
          <button className="btn-outline">All</button>
          <button className="btn-outline">Succeeded</button>
          <button className="btn-outline">Processing</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((v) => (
          <div key={v.videoId} className="p-4 card">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium line-clamp-1">{v.title || v.prompt}</div>
              <span className="text-xs px-2 py-1 rounded bg-gray-100">{v.status}</span>
            </div>
            <div className="text-sm text-gray-600 mb-3 line-clamp-2">{v.prompt}</div>
            <div className="flex gap-2">
              {v.status === "SUCCEEDED" && (
                <Link href={`/editor/${v.videoId}`} className="btn-primary text-sm">Edit</Link>
              )}
              {v.videoUrls?.[0] && (<a className="btn text-sm" href={v.videoUrls[0]} target="_blank">Download</a>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



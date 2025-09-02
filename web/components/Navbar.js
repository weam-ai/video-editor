"use client";
import Link from "next/link";

export default function Navbar() {
  const nav = [
    { href: "/generate", label: "Generate" },
    { href: "/history", label: "History" },
  ];
  return (
    <nav className="w-full bg-white border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/generate" className="font-semibold text-[15px] tracking-tight">Runway Creator</Link>
        <div className="flex gap-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="px-3 py-2 rounded-md text-[14px] hover:bg-black hover:text-white transition-colors">
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}



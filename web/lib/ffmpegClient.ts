"use client";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let _ffmpeg: FFmpeg | null = null;

export async function getFFmpeg() {
  if (_ffmpeg) return _ffmpeg;
  _ffmpeg = new FFmpeg();
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  await _ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  return _ffmpeg;
}

export async function writeInput(ff: FFmpeg, name: string, file: File | ArrayBuffer | Uint8Array) {
  const data = file instanceof File ? await fetchFile(file) : new Uint8Array(file as ArrayBuffer);
  await ff.writeFile(name, data);
}

export async function readOutput(ff: FFmpeg, name: string) {
  const data = await ff.readFile(name);
  return new Blob([data], { type: name.endsWith('.webm') ? 'video/webm' : 'video/mp4' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}



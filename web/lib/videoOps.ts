"use client";
import { getFFmpeg, writeInput, readOutput } from './ffmpegClient';

export async function trimVideo(file: File, startSec: number, endSec: number, out = 'out.mp4') {
  const ff = await getFFmpeg();
  await writeInput(ff, 'in.mp4', file);
  const duration = Math.max(0, endSec - startSec);
  try {
    await ff.exec(['-ss', `${startSec}`, '-i', 'in.mp4', '-t', `${duration}`, '-c', 'copy', out]);
  } catch {
    await ff.exec(['-ss', `${startSec}`, '-i', 'in.mp4', '-t', `${duration}`, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-c:a', 'aac', out]);
  }
  return readOutput(ff, out);
}

export async function mergeSameCodec(files: File[], out = 'merged.mp4') {
  const ff = await getFFmpeg();
  const list: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const name = `in${i}.mp4`;
    await writeInput(ff, name, files[i]);
    list.push(`file '${name}'`);
  }
  await ff.writeFile('list.txt', new TextEncoder().encode(list.join('\n')));
  await ff.exec(['-f', 'concat', '-safe', '0', '-i', 'list.txt', '-c', 'copy', out]);
  return readOutput(ff, out);
}

export async function mergeReencode(files: File[], out = 'merged.mp4') {
  const ff = await getFFmpeg();
  const inputs: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const name = `in${i}.mp4`; await writeInput(ff, name, files[i]); inputs.push('-i', name);
  }
  const n = files.length;
  await ff.exec([
    ...inputs,
    '-filter_complex', `concat=n=${n}:v=1:a=1[v][a]`,
    '-map', '[v]', '-map', '[a]',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-c:a', 'aac',
    out,
  ]);
  return readOutput(ff, out);
}

export async function addTextOverlay(file: File, text: string, opts?: {
  x?: string; y?: string; start?: number; end?: number; fontSize?: number; fontColor?: string; fontFileArrayBuffer?: ArrayBuffer;
}, out = 'text.mp4') {
  const ff = await getFFmpeg();
  await writeInput(ff, 'in.mp4', file);
  if (opts?.fontFileArrayBuffer) await writeInput(ff, 'font.ttf', opts.fontFileArrayBuffer);
  const fontParam = opts?.fontFileArrayBuffer ? ':fontfile=font.ttf' : '';
  const x = opts?.x ?? '(w-text_w)/2';
  const y = opts?.y ?? 'h-100';
  const fontSize = opts?.fontSize ?? 36;
  const fontColor = opts?.fontColor ?? 'white';
  const enable = (opts?.start != null && opts?.end != null) ? `:enable='between(t,${opts.start},${opts.end})'` : '';
  const drawtext = `drawtext=text='${text.replace(/:/g, '\\:').replace(/'/g, "\\'")}':x=${x}:y=${y}${fontParam}:fontsize=${fontSize}:fontcolor=${fontColor}${enable}`;
  await ff.exec(['-i', 'in.mp4', '-vf', drawtext, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-c:a', 'aac', out]);
  return readOutput(ff, out);
}

export async function replaceAudio(video: File, audio: File, out = 'muxed.mp4') {
  const ff = await getFFmpeg();
  await writeInput(ff, 'v.mp4', video);
  await writeInput(ff, 'a.mp3', audio);
  await ff.exec(['-i', 'v.mp4', '-i', 'a.mp3', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-shortest', out]);
  return readOutput(ff, out);
}

export async function mixAudio(video: File, audio: File, out = 'mix.mp4') {
  const ff = await getFFmpeg();
  await writeInput(ff, 'v.mp4', video);
  await writeInput(ff, 'a.mp3', audio);
  await ff.exec([
    '-i', 'v.mp4', '-i', 'a.mp3',
    '-filter_complex', '[0:a][1:a]amix=inputs=2:duration=shortest[aout]',
    '-map', '0:v', '-map', '[aout]',
    '-c:v', 'copy', '-c:a', 'aac',
    out
  ]);
  return readOutput(ff, out);
}

export async function exportAs(file: File, format: 'mp4'|'webm') {
  const ff = await getFFmpeg();
  const inName = 'in.mp4';
  const out = format === 'webm' ? 'out.webm' : 'out.mp4';
  await writeInput(ff, inName, file);
  if (format === 'webm') {
    await ff.exec(['-i', inName, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '28', '-pix_fmt', 'yuv420p', '-c:a', 'libopus', out]);
  } else {
    await ff.exec(['-i', inName, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p', '-c:a', 'aac', out]);
  }
  return readOutput(ff, out);
}



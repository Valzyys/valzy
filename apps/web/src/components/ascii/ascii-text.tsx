"use client";

import { cn } from "@homepage/ui/lib/utils";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const RAMP = " .:-=+*#%@";
const NOISE = "▓▒░#%@*+=-:<>/\\";

function rasterize(text: string, cols: number, family: string) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) return [];
	const size = 160;
	ctx.font = `700 ${size}px ${family}`;
	const width = Math.ceil(ctx.measureText(text).width) + 8;
	const height = Math.ceil(size * 1.05);
	canvas.width = width;
	canvas.height = height;
	ctx.font = `700 ${size}px ${family}`;
	ctx.fillStyle = "#000";
	ctx.textBaseline = "middle";
	ctx.fillText(text, 4, height / 2);

	// Glyphs are roughly twice as tall as they are wide.
	const rows = Math.max(4, Math.round((cols * height) / width / 2));
	const cellW = width / cols;
	const cellH = height / rows;
	const { data } = ctx.getImageData(0, 0, width, height);
	const lines: string[] = [];
	for (let r = 0; r < rows; r++) {
		let line = "";
		for (let c = 0; c < cols; c++) {
			let sum = 0;
			let n = 0;
			for (let y = Math.floor(r * cellH); y < (r + 1) * cellH; y += 2) {
				for (let x = Math.floor(c * cellW); x < (c + 1) * cellW; x += 2) {
					sum += data[(y * width + x) * 4 + 3];
					n++;
				}
			}
			const v = n ? sum / n / 255 : 0;
			line += RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
		}
		lines.push(line.replace(/\s+$/, ""));
	}
	while (lines.length && !lines[0].trim()) lines.shift();
	while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
	return lines;
}

type AsciiTextProps = {
	text: string;
	/** Number of glyph columns the text is sampled into. */
	cols?: number;
	className?: string;
};

/** Renders a word as ASCII art and "decodes" it from noise on mount. */
export function AsciiText({ text, cols = 72, className }: AsciiTextProps) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const preRef = useRef<HTMLPreElement>(null);
	const [fontSize, setFontSize] = useState(8);

	useEffect(() => {
		let raf = 0;
		let cancelled = false;
		document.fonts.ready.then(() => {
			if (cancelled) return;
			const family =
				getComputedStyle(document.body).getPropertyValue("--font-sans") ||
				"sans-serif";
			decode(rasterize(text, cols, family));
		});

		const decode = (lines: string[]) => {
			const target = lines.join("\n");
			const pre = preRef.current;
			if (!pre) return;
			if (prefersReducedMotion()) {
				pre.textContent = target;
				return;
			}
			const start = performance.now();
			const duration = 1400;
			const tick = (now: number) => {
				const p = Math.min(1, (now - start) / duration);
				let out = "";
				for (let r = 0; r < lines.length; r++) {
					const line = lines[r];
					for (let c = 0; c < line.length; c++) {
						const ch = line[c];
						const threshold = (c / cols) * 0.7 + (r / lines.length) * 0.3;
						if (ch === " " || p > threshold + 0.15) out += ch;
						else if (p > threshold - 0.25)
							out += NOISE[Math.floor(Math.random() * NOISE.length)];
						else out += " ";
					}
					out += "\n";
				}
				pre.textContent = out;
				if (p < 1) raf = requestAnimationFrame(tick);
				else pre.textContent = target;
			};
			raf = requestAnimationFrame(tick);
		};

		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
		};
	}, [text, cols]);

	useEffect(() => {
		const el = wrapRef.current;
		if (!el) return;
		const ro = new ResizeObserver(([entry]) => {
			// A monospace glyph is ~0.6em wide.
			setFontSize(entry.contentRect.width / cols / 0.6);
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, [cols]);

	return (
		<div
			ref={wrapRef}
			className={cn("w-full overflow-hidden", className)}
			role="img"
			aria-label={text}
		>
			<pre
				ref={preRef}
				className="m-0 select-none font-mono leading-[1] tracking-normal"
				style={{ fontSize }}
			/>
		</div>
	);
}

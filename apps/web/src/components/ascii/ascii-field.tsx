"use client";

import { cn } from "@homepage/ui/lib/utils";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const RAMP = " .·:-=+*≈%#@";

type AsciiFieldProps = {
	className?: string;
	/** Font size of each glyph in px. */
	cell?: number;
	/** Hex colour used for glyphs that light up around the pointer. */
	accent?: string;
};

/**
 * Full-bleed canvas of drifting ASCII noise that ripples around the pointer.
 * Glyph colour comes from the element's CSS `color`, so it follows the theme.
 */
export function AsciiField({
	className,
	cell = 13,
	accent = "#f97316",
}: AsciiFieldProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const reduced = prefersReducedMotion();
		const family =
			getComputedStyle(document.body).getPropertyValue("--font-geist-mono") ||
			"monospace";
		const pointer = { x: -9999, y: -9999, energy: 0 };
		let cols = 0;
		let rows = 0;
		let cw = 0;
		let ch = 0;
		let raf = 0;
		let visible = true;
		let last = 0;

		const resize = () => {
			const { width, height } = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.font = `${cell}px ${family}`;
			ctx.textBaseline = "top";
			cw = ctx.measureText("M").width;
			ch = cell * 1.25;
			cols = Math.ceil(width / cw);
			rows = Math.ceil(height / ch);
		};

		const draw = (time: number) => {
			const t = time / 1000;
			const { width, height } = canvas.getBoundingClientRect();
			ctx.clearRect(0, 0, width, height);
			const base = getComputedStyle(canvas).color;
			const hot: [number, number, string][] = [];
			pointer.energy *= 0.94;

			for (let r = 0; r < rows; r++) {
				let line = "";
				const y = r / rows;
				for (let c = 0; c < cols; c++) {
					const x = c / cols;
					let v =
						Math.sin(x * 7 + t * 0.55) +
						Math.sin(y * 9 - t * 0.35 + Math.sin(x * 3 + t * 0.2)) +
						Math.sin((x + y) * 5 + t * 0.45) +
						Math.cos(Math.hypot(x - 0.7, y - 0.4) * 14 - t * 0.9);
					v = (v + 4) / 8;
					// Fade out towards the top-left where the headline sits.
					v *= 0.25 + 0.85 * Math.min(1, x * 0.9 + y * 0.7);
					const dx = c * cw - pointer.x;
					const dy = r * ch - pointer.y;
					const d = Math.hypot(dx, dy);
					const ripple = Math.exp(-(d * d) / 14000) * (0.6 + pointer.energy);
					const wave =
						Math.sin(d * 0.045 - t * 6) *
						Math.exp(-d / 260) *
						0.35 *
						(0.4 + pointer.energy);
					v = Math.min(0.999, Math.max(0, v + ripple * 0.75 + wave));
					const glyph = RAMP[Math.floor(v * RAMP.length)];
					if (ripple > 0.35 && glyph !== " ") {
						hot.push([c, r, glyph]);
						line += " ";
					} else {
						line += glyph;
					}
				}
				ctx.fillStyle = base;
				ctx.fillText(line, 0, r * ch);
			}

			ctx.fillStyle = accent;
			for (const [c, r, glyph] of hot) ctx.fillText(glyph, c * cw, r * ch);
		};

		const loop = (time: number) => {
			raf = requestAnimationFrame(loop);
			if (!visible || time - last < 33) return;
			last = time;
			draw(time);
		};

		const onMove = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			const nx = e.clientX - rect.left;
			const ny = e.clientY - rect.top;
			pointer.energy = Math.min(
				1.2,
				pointer.energy + Math.hypot(nx - pointer.x, ny - pointer.y) / 400,
			);
			pointer.x = nx;
			pointer.y = ny;
		};
		const onLeave = () => {
			pointer.x = -9999;
			pointer.y = -9999;
		};

		resize();
		document.fonts.ready.then(resize);
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
		});
		io.observe(canvas);

		if (reduced) {
			draw(0);
		} else {
			raf = requestAnimationFrame(loop);
			window.addEventListener("pointermove", onMove, { passive: true });
			canvas.parentElement?.addEventListener("pointerleave", onLeave);
		}

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			window.removeEventListener("pointermove", onMove);
			canvas.parentElement?.removeEventListener("pointerleave", onLeave);
		};
	}, [cell, accent]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className={cn("pointer-events-none block size-full", className)}
		/>
	);
}

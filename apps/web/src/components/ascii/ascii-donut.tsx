"use client";

import { cn } from "@homepage/ui/lib/utils";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const W = 54;
const H = 24;
const LUMA = ".,-~:;=!*#$@";

/** The classic spinning ASCII torus (after Andy Sloane's donut.c). */
export function AsciiDonut({ className }: { className?: string }) {
	const ref = useRef<HTMLPreElement>(null);

	useEffect(() => {
		let a = 1;
		let b = 1;
		let raf = 0;
		let last = 0;
		let visible = true;

		const frame = () => {
			const out: string[] = new Array(W * H).fill(" ");
			const z: number[] = new Array(W * H).fill(0);
			const cA = Math.cos(a);
			const sA = Math.sin(a);
			const cB = Math.cos(b);
			const sB = Math.sin(b);
			for (let j = 0; j < 6.28; j += 0.07) {
				const ct = Math.cos(j);
				const st = Math.sin(j);
				for (let i = 0; i < 6.28; i += 0.02) {
					const sp = Math.sin(i);
					const cp = Math.cos(i);
					const h = ct + 2;
					const D = 1 / (sp * h * sA + st * cA + 5);
					const t = sp * h * cA - st * sA;
					const x = Math.floor(W / 2 + W * 0.55 * D * (cp * h * cB - t * sB));
					const y = Math.floor(H / 2 + H * 0.6 * D * (cp * h * sB + t * cB));
					const o = x + W * y;
					const N = Math.floor(
						8 *
							((st * sA - sp * ct * cA) * cB -
								sp * ct * sA -
								st * cA -
								cp * ct * sB),
					);
					if (y < H && y >= 0 && x >= 0 && x < W && D > z[o]) {
						z[o] = D;
						out[o] = LUMA[Math.max(0, N)];
					}
				}
			}
			let s = "";
			for (let k = 0; k < H; k++)
				s += `${out.slice(k * W, (k + 1) * W).join("")}\n`;
			if (ref.current) ref.current.textContent = s;
		};

		const loop = (time: number) => {
			raf = requestAnimationFrame(loop);
			if (!visible || time - last < 40) return;
			last = time;
			a += 0.05;
			b += 0.025;
			frame();
		};

		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
		});
		if (ref.current) io.observe(ref.current);

		frame();
		if (!prefersReducedMotion()) raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
		};
	}, []);

	return (
		<pre
			ref={ref}
			aria-hidden
			className={cn(
				"m-0 select-none font-mono leading-[1.05] tracking-normal",
				className,
			)}
		/>
	);
}

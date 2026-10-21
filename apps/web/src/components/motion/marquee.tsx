"use client";

import { cn } from "@homepage/ui/lib/utils";
import { type ReactNode, useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

type MarqueeProps = {
	children: ReactNode;
	className?: string;
	/** Seconds for one full loop at rest. */
	duration?: number;
	reverse?: boolean;
};

/** Infinite ticker that speeds up (and flips) with scroll velocity. */
export function Marquee({
	children,
	className,
	duration = 30,
	reverse = false,
}: MarqueeProps) {
	const root = useRef<HTMLDivElement>(null);
	const track = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (prefersReducedMotion()) return;
			const tween = gsap.fromTo(
				track.current,
				{ xPercent: reverse ? -50 : 0 },
				{ xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
			);
			let settle: gsap.core.Tween | undefined;
			ScrollTrigger.create({
				trigger: root.current,
				start: "top bottom",
				end: "bottom top",
				onUpdate(self) {
					const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
					tween.timeScale(boost * self.direction);
					settle?.kill();
					settle = gsap.to(tween, {
						timeScale: self.direction,
						duration: 1.2,
						ease: "power3.out",
						delay: 0.05,
					});
				},
			});
		},
		{ scope: root },
	);

	return (
		<div
			ref={root}
			className={cn("relative flex w-full overflow-hidden", className)}
		>
			<div ref={track} className="flex w-max shrink-0 will-change-transform">
				<div className="flex shrink-0 items-center">{children}</div>
				<div className="flex shrink-0 items-center" aria-hidden>
					{children}
				</div>
			</div>
		</div>
	);
}

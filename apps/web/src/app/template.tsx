"use client";

import { type ReactNode, useRef } from "react";
import { gsap, isIntroDone, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Re-mounts on every navigation, so each page slides in after the previous one. */
export default function Template({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		// The very first page load is choreographed by the intro + hero instead.
		if (!isIntroDone() || prefersReducedMotion()) return;
		gsap.from(ref.current, {
			y: 60,
			autoAlpha: 0,
			clipPath: "inset(8% 0 0 0 round 24px)",
			duration: 1,
			ease: "expo.out",
			clearProps: "all",
		});
	});

	return (
		<div ref={ref} className="w-full">
			{children}
		</div>
	);
}

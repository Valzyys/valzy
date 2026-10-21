"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ScrollProgress() {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		gsap.fromTo(
			ref.current,
			{ scaleX: 0 },
			{
				scaleX: 1,
				ease: "none",
				scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
			},
		);
	});

	return (
		<div
			aria-hidden
			ref={ref}
			className="pointer-events-none fixed inset-x-0 top-0 z-[10000] h-[3px] origin-left bg-orange-500"
		/>
	);
}

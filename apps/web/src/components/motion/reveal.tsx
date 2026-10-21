"use client";

import { type ReactNode, useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type RevealProps = {
	children: ReactNode;
	className?: string;
	/** Seconds to wait before playing once in view. */
	delay?: number;
	/** Distance in px the content travels up. */
	y?: number;
	/** Animate direct children one after another instead of the whole block. */
	stagger?: number;
};

export function Reveal({
	children,
	className,
	delay = 0,
	y = 48,
	stagger,
}: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el || prefersReducedMotion()) return;
			const targets = stagger ? Array.from(el.children) : el;
			gsap.from(targets, {
				y,
				autoAlpha: 0,
				filter: "blur(10px)",
				duration: 1.1,
				delay,
				stagger,
				ease: "expo.out",
				clearProps: "filter,transform",
				scrollTrigger: { trigger: el, start: "top 88%", once: true },
			});
		},
		{ scope: ref },
	);

	return (
		<div ref={ref} className={className} style={{ width: "100%" }}>
			{children}
		</div>
	);
}

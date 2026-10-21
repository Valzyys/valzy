"use client";

import { type ReactNode, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Text that scrambles through ASCII glyphs on hover. */
export function ScrambleText({
	text,
	className,
	chars = "▓▒░<>/\\_-=+*#",
	children,
}: {
	text: string;
	className?: string;
	chars?: string;
	children?: ReactNode;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const { contextSafe } = useGSAP({ scope: ref });

	const play = contextSafe(() => {
		const el = ref.current?.querySelector("[data-scramble]");
		if (!el) return;
		gsap.to(el, {
			duration: 0.6,
			scrambleText: { text, chars, speed: 0.6, revealDelay: 0.1 },
			overwrite: true,
		});
	});

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: purely decorative hover effect; the wrapping link stays the interactive element
		<span ref={ref} className={className} onMouseEnter={play} onFocus={play}>
			<span data-scramble>{text}</span>
			{children}
		</span>
	);
}

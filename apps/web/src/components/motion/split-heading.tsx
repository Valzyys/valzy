"use client";

import { type ElementType, type ReactNode, useRef } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";

type SplitHeadingProps = {
	children: ReactNode;
	className?: string;
	as?: ElementType;
	/** Play immediately instead of on scroll (used above the fold). */
	immediate?: boolean;
	delay?: number;
	type?: "chars" | "words" | "lines";
};

export function SplitHeading({
	children,
	className,
	as: Tag = "span",
	immediate = false,
	delay = 0,
	type = "words",
}: SplitHeadingProps) {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const el = ref.current;
			if (!el || prefersReducedMotion()) return;
			SplitText.create(el, {
				type: type === "chars" ? "words,chars" : type,
				mask: type,
				autoSplit: true,
				onSplit(self) {
					const parts =
						type === "chars"
							? self.chars
							: type === "lines"
								? self.lines
								: self.words;
					return gsap.from(parts, {
						yPercent: 110,
						rotate: type === "chars" ? 8 : 2,
						duration: 1.15,
						delay,
						ease: "expo.out",
						stagger: type === "chars" ? 0.025 : 0.06,
						scrollTrigger: immediate
							? undefined
							: { trigger: el, start: "top 90%", once: true },
					});
				},
			});
		},
		{ scope: ref },
	);

	return (
		<Tag ref={ref} className={className}>
			{children}
		</Tag>
	);
}

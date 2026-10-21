"use client";

import { useRef } from "react";
import { AsciiText } from "@/components/ascii/ascii-text";
import { SplitHeading } from "@/components/motion/split-heading";
import { gsap, useGSAP } from "@/lib/gsap";

type PageHeroProps = {
	index: string;
	title: string;
	headline: string;
	description: string;
	/** Columns used for the ASCII title; shorter words look better with fewer. */
	cols?: number;
	aside?: React.ReactNode;
};

export function PageHero({
	index,
	title,
	headline,
	description,
	cols = 96,
	aside,
}: PageHeroProps) {
	const root = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.from("[data-page-hero-fade]", {
				autoAlpha: 0,
				y: 20,
				duration: 1,
				ease: "expo.out",
				stagger: 0.08,
				delay: 0.2,
			});
		},
		{ scope: root },
	);

	return (
		<section ref={root} className="flex w-full flex-col gap-8">
			<div
				data-page-hero-fade
				className="flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase tracking-widest"
			>
				<span>
					[ {index} — {title} ]
				</span>
				<span className="hidden sm:inline">
					valzynathaniel.my.id/{title.toLowerCase()}
				</span>
			</div>
			<AsciiText
				text={title.toUpperCase()}
				cols={cols}
				className="text-foreground/80"
			/>
			<div className="grid grid-cols-1 gap-6 border-foreground/10 border-t pt-6 md:grid-cols-12">
				<SplitHeading
					as="h1"
					immediate
					delay={0.3}
					className="m-0 font-medium text-4xl text-foreground leading-[1.05] md:col-span-7 md:text-5xl"
				>
					{headline}
				</SplitHeading>
				<div data-page-hero-fade className="flex flex-col gap-4 md:col-span-5">
					<p className="m-0 text-lg text-muted-foreground leading-relaxed">
						{description}
					</p>
					{aside}
				</div>
			</div>
		</section>
	);
}

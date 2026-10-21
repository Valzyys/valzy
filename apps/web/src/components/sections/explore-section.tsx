"use client";

import Link from "next/link";
import { useRef } from "react";
import {
	SectionHeading,
	SectionRoot,
	SectionText,
} from "@/components/section/section-heading";
import { gsap, useGSAP } from "@/lib/gsap";
import { pages } from "@/lib/site";

export default function ExploreSection({ id }: { id: string }) {
	const list = useRef<HTMLUListElement>(null);

	useGSAP(
		() => {
			gsap.from("li", {
				xPercent: -6,
				autoAlpha: 0,
				duration: 0.9,
				ease: "expo.out",
				stagger: 0.07,
				scrollTrigger: { trigger: list.current, start: "top 85%", once: true },
			});
		},
		{ scope: list },
	);

	return (
		<SectionRoot id={id}>
			<SectionHeading before="Keep" highlight="exploring." />
			<SectionText>
				There's more than one page to this place — pick a door:
			</SectionText>
			<ul ref={list} className="m-0 mt-2 flex w-full list-none flex-col p-0">
				{pages
					.filter((p) => p.href !== "/")
					.map((page) => (
						<li
							key={page.href}
							className="border-foreground/10 border-b first:border-t"
						>
							<Link
								href={page.href}
								className="ink group relative flex items-center gap-4 overflow-hidden py-4 text-foreground no-underline"
							>
								<span
									aria-hidden
									className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-y-100"
								/>
								<span className="relative w-8 pl-2 font-mono text-orange-500 text-xs">
									{page.index}
								</span>
								<span className="relative font-pixel text-3xl transition-all duration-500 group-hover:translate-x-2 group-hover:text-background">
									{page.label}
								</span>
								<span className="relative hidden flex-1 overflow-hidden whitespace-nowrap font-mono text-muted-foreground/40 text-xs sm:block">
									{"·".repeat(200)}
								</span>
								<span className="relative ml-auto hidden font-mono text-muted-foreground text-xs transition-colors group-hover:text-background/70 md:block">
									{page.blurb}
								</span>
								<span className="relative pr-3 font-mono text-foreground transition-all duration-500 group-hover:-rotate-45 group-hover:text-orange-500">
									→
								</span>
							</Link>
						</li>
					))}
			</ul>
		</SectionRoot>
	);
}

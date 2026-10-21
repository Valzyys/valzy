import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ScrambleText } from "@/components/motion/scramble-link";
import { ContactComposer } from "@/components/site/contact-composer";
import { LocalClock } from "@/components/site/local-clock";
import { PageCard } from "@/components/site/page-card";
import { PageHero } from "@/components/site/page-hero";
import { socials } from "@/resources/socials";

export const metadata: Metadata = { title: "Contact" };

const channels = [
	{
		label: "Email",
		value: socials.email.replace("mailto:", ""),
		href: socials.email,
	},
	{ label: "X / Twitter", value: "@valzyys", href: socials.x },
	{ label: "GitHub", value: "JKT48Connect", href: socials.github },
];

export default function ContactPage() {
	return (
		<PageCard
			maxWidth="m"
			stage={
				<PageHero
					index="05"
					title="Contact"
					cols={96}
					headline="Have something in mind? My inbox is open."
					description="Projects, API questions, collabs or just a hello — I read everything and usually reply within a day or two."
					aside={
						<p className="m-0 flex items-center gap-2 font-mono text-muted-foreground text-xs uppercase tracking-widest">
							<span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
							Jakarta · <LocalClock className="text-foreground" /> WIB
						</p>
					}
				/>
			}
		>
			<Reveal className="w-full">
				<ContactComposer />
			</Reveal>
			<Reveal stagger={0.08} className="flex w-full flex-col">
				{channels.map((c) => (
					<a
						key={c.label}
						href={c.href}
						target="_blank"
						rel="noopener noreferrer"
						className="ink group flex items-baseline justify-between gap-4 border-foreground/10 border-b py-5 text-foreground no-underline first:border-t"
					>
						<span className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
							{c.label}
						</span>
						<span className="flex items-baseline gap-3 text-2xl md:text-4xl">
							<ScrambleText text={c.value} />
							<span className="text-base text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-orange-500">
								↗
							</span>
						</span>
					</a>
				))}
			</Reveal>
		</PageCard>
	);
}

import { AsciiText } from "@/components/ascii/ascii-text";
import { AsciiButton } from "@/components/site/ascii-button";
import { PageCard } from "@/components/site/page-card";

export default function NotFound() {
	return (
		<PageCard maxWidth="m">
			<section className="flex min-h-[60vh] w-full flex-col justify-center gap-8">
				<span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
					[ err — 404 ]
				</span>
				<AsciiText text="404" cols={60} className="text-orange-500" />
				<div className="flex flex-col gap-3 rounded-2xl bg-stone-950 p-6 font-mono text-sm text-stone-400">
					<span>
						<span className="text-orange-500">valzy@jkt48connect:~$</span> cd{" "}
						{"<"}this-page{">"}
					</span>
					<span className="text-rose-400">cd: no such file or directory</span>
					<span>
						<span className="text-orange-500">valzy@jkt48connect:~$</span>{" "}
						<span className="animate-pulse">▋</span>
					</span>
				</div>
				<div className="flex flex-wrap gap-2">
					<AsciiButton href="/" label="cd ~" />
					<AsciiButton href="/projects" label="See projects" variant="ghost" />
				</div>
			</section>
		</PageCard>
	);
}

import { cn } from "@homepage/ui/lib/utils";
import type { Route } from "next";
import Link from "next/link";

type AsciiButtonProps = {
	label: string;
	href: Route | string;
	variant?: "solid" | "ghost";
	className?: string;
	external?: boolean;
};

/** Bracketed mono call-to-action with a sweeping fill on hover. */
export function AsciiButton({
	label,
	href,
	variant = "solid",
	className,
	external,
}: AsciiButtonProps) {
	const classes = cn(
		"ink group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-[8px] px-4 font-mono text-[13px] uppercase tracking-wider no-underline transition-colors duration-300",
		variant === "solid"
			? "bg-stone-950 text-stone-50 hover:text-white dark:bg-stone-50 dark:text-stone-950"
			: "border border-foreground/20 bg-accent/70 text-foreground backdrop-blur-sm hover:text-white",
		className,
	);
	const inner = (
		<>
			<span
				aria-hidden
				className="absolute inset-0 origin-left scale-x-0 bg-orange-500 transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-x-100"
			/>
			<span className="relative text-orange-500 transition-colors group-hover:text-white">
				[
			</span>
			<span className="relative">{label}</span>
			<span className="relative transition-transform duration-300 group-hover:translate-x-1">
				→
			</span>
			<span className="relative text-orange-500 transition-colors group-hover:text-white">
				]
			</span>
		</>
	);

	if (external || href.startsWith("http") || href.startsWith("mailto:")) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={classes}
			>
				{inner}
			</a>
		);
	}
	return (
		<Link href={href as Route} className={classes}>
			{inner}
		</Link>
	);
}

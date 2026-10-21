import type { Route } from "next";

export const pages: {
	label: string;
	href: Route;
	index: string;
	blurb: string;
}[] = [
	{ label: "Home", href: "/", index: "00", blurb: "Where it all starts." },
	{
		label: "About",
		href: "/about",
		index: "01",
		blurb: "Who I am, what I care about.",
	},
	{
		label: "Projects",
		href: "/projects",
		index: "02",
		blurb: "Things I've shipped.",
	},
	{ label: "Stack", href: "/stack", index: "03", blurb: "Tools of the trade." },
	{
		label: "Journey",
		href: "/journey",
		index: "04",
		blurb: "Work & learning timeline.",
	},
	{
		label: "Contact",
		href: "/contact",
		index: "05",
		blurb: "Say hi, start something.",
	},
];

export function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/@/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

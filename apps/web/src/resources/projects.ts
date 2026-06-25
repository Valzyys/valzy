import type { Projects } from "@/components/projects-block";
/**
 * 
 *  title: string;
  description: string;
  imageUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  date: Date;
  invert:boolean;
 */
export const projectsData: Projects[] = [
	{
		title: "JKT48Connect API",
		description:
			"The most complete JKT48 API available, providing structured access to member data, theater schedules, live streams, news, and more for developers building fan-facing JKT48 applications.",
		imageUrl:
			"https://i.pinimg.com/originals/f7/1a/c4/f71ac494e234d8e3d5f590408097ef42.gif",
		liveUrl: "https://docs.jkt48connect.com",
		invert: true,
		date: new Date("2024-06-15"),
	},
	{
		title: "GiStream",
		description:
			"An affordable platform for streaming JKT48 theater shows live, giving fans an accessible way to watch every theater performance without breaking the bank.",
		imageUrl:
			"https://i.pinimg.com/originals/ff/04/40/ff0440051eca64114ced7efe3456f746.gif",
		liveUrl: "https://gstreamlive.com",
		date: new Date("2024-09-10"),
	},
	{
		title: "JKT48Connect Pay",
		description:
			"An automated QRIS payment gateway built on Cloudflare Workers, handling real-time payment polling, multi-tenant billing, and webhook-based subscription management for the JKT48Connect ecosystem.",
		imageUrl:
			"https://i.pinimg.com/originals/07/45/97/074597c200db394fe7282340e66c6042.gif",
		liveUrl: "https://pay.jkt48connect.com",
		invert: true,
		date: new Date("2026-05-01"),
	},
	{
		title: "JKT48Connect App",
		description:
			"A complete mobile companion for JKT48 fans, bringing together theater schedules, news, live member tracking, stream history, and direct theater live streaming in one app.",
		imageUrl:
			"https://i.pinimg.com/originals/d9/44/c0/d944c096fc193424f0895d67b3b3caf4.gif",
		repoUrl: "https://github.com/JKT48Connect/JKT48Connect-APP",
		liveUrl: "https://github.com/JKT48Connect/JKT48Connect-APP/releases",
		date: new Date("2025-03-01"),
	},
	{
		title: "@jkt48/core",
		description:
			"An open-source Node.js module that exposes the full JKT48Connect API as an easy-to-use package, giving developers instant access to member data, theater schedules, live streams, and news straight from npm.",
		imageUrl:
			"https://i.pinimg.com/originals/1d/8f/51/1d8f51cd5cc39a7280cd4806874723e2.gif",
		repoUrl: "https://github.com/JKT48Connect/jkt48-core",
		liveUrl: "https://www.npmjs.com/package/@jkt48/core",
		invert: true,
		date: new Date("2025-08-20"),
	},
	{
		title: "JKT48Connect Discord Bot",
		description:
			"A Discord bot built for JKT48 fan communities, delivering real-time live notifications from IDN Live and Showroom along with the latest JKT48 news and event updates, right inside Discord servers.",
		imageUrl:
			"https://i.pinimg.com/originals/ac/a8/4c/aca84c26b527ba422235ec69be67f8a8.gif",
		liveUrl: "https://top.gg/bot/1305141693477027891",
		date: new Date("2024-11-20"),
	},
];

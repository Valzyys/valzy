"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import {
	type FormEvent,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { pages } from "@/lib/site";
import { socials } from "@/resources/socials";

type Line = { id: number; kind: "in" | "out" | "err"; body: ReactNode };

const PROMPT = "valzy@jkt48connect:~$";
const HELP = [
	["help", "list commands"],
	["whoami", "who's behind this"],
	["ls", "list pages"],
	["cd <page>", "go to a page"],
	["open <github|x|email>", "open a link"],
	["oshi", "very important"],
	["date", "local time in jakarta"],
	["clear", "wipe the screen"],
];

let uid = 0;

export function Terminal() {
	const router = useRouter();
	const [lines, setLines] = useState<Line[]>([
		{
			id: uid++,
			kind: "out",
			body: "valzy.sys interactive shell — type `help` to start.",
		},
	]);
	const [value, setValue] = useState("");
	const [history, setHistory] = useState<string[]>([]);
	const [cursor, setCursor] = useState(-1);
	const scroller = useRef<HTMLDivElement>(null);
	const input = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (lines.length)
			scroller.current?.scrollTo({
				top: scroller.current.scrollHeight,
				behavior: "smooth",
			});
	}, [lines]);

	const run = (raw: string) => {
		const [cmd = "", ...args] = raw.trim().split(/\s+/);
		const arg = args.join(" ").toLowerCase();
		const out = (body: ReactNode, kind: Line["kind"] = "out") => ({
			id: uid++,
			kind,
			body,
		});

		switch (cmd.toLowerCase()) {
			case "":
				return [];
			case "help":
				return HELP.map(([c, d]) =>
					out(
						<>
							<span className="inline-block w-44 text-orange-400">{c}</span>
							<span className="text-stone-500">{d}</span>
						</>,
					),
				);
			case "whoami":
				return [
					out(
						"valzy nathaniel — full-stack dev, founder & sole engineer of jkt48connect. based in indonesia.",
					),
				];
			case "ls":
				return [out(pages.map((p) => `${p.label.toLowerCase()}/`).join("  "))];
			case "cd": {
				const target = arg.replace(/^\/|\/$/g, "");
				const page = pages.find(
					(p) =>
						p.label.toLowerCase() === target ||
						(target === "~" && p.href === "/"),
				);
				if (!page) return [out(`cd: no such page: ${arg || "(empty)"}`, "err")];
				router.push(page.href as Route);
				return [out(`→ navigating to ${page.href}`)];
			}
			case "open": {
				const map: Record<string, string> = {
					github: socials.github,
					x: socials.x,
					twitter: socials.x,
					email: socials.email,
				};
				const href = map[arg];
				if (!href) return [out("usage: open <github|x|email>", "err")];
				window.open(href, "_blank", "noopener,noreferrer");
				return [out(`opening ${arg} ↗`)];
			}
			case "oshi":
				return [out("catherina vallencia ♡ — always.")];
			case "date":
				return [
					out(
						new Intl.DateTimeFormat("en-GB", {
							timeZone: "Asia/Jakarta",
							dateStyle: "full",
							timeStyle: "medium",
						}).format(new Date()),
					),
				];
			case "sudo":
				return [
					out("nice try. this incident will be reported to the oshi.", "err"),
				];
			case "clear":
				return null;
			default:
				return [out(`command not found: ${cmd}. try \`help\`.`, "err")];
		}
	};

	const submit = (e: FormEvent) => {
		e.preventDefault();
		const result = run(value);
		const echo: Line = { id: uid++, kind: "in", body: value };
		setLines((prev) => (result === null ? [] : [...prev, echo, ...result]));
		if (value.trim()) setHistory((h) => [value, ...h].slice(0, 20));
		setCursor(-1);
		setValue("");
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowUp" && history.length) {
			e.preventDefault();
			const next = Math.min(cursor + 1, history.length - 1);
			setCursor(next);
			setValue(history[next]);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			const next = cursor - 1;
			setCursor(Math.max(next, -1));
			setValue(next < 0 ? "" : history[next]);
		}
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: focusing the input is a convenience; the input itself is keyboard reachable
		<div
			className="flex h-full min-h-72 flex-col overflow-hidden rounded-xl border border-stone-800 bg-stone-900/70 font-mono text-[12px] text-stone-300"
			onClick={() => input.current?.focus()}
		>
			<div className="flex items-center gap-1.5 border-stone-800 border-b px-3 py-2">
				<span className="size-2.5 rounded-full bg-stone-700" />
				<span className="size-2.5 rounded-full bg-stone-700" />
				<span className="size-2.5 rounded-full bg-orange-500" />
				<span className="ml-2 text-[10px] text-stone-500 uppercase tracking-widest">
					~/valzy — zsh
				</span>
			</div>
			<div
				ref={scroller}
				data-lenis-prevent
				className="flex-1 overflow-y-auto px-3 py-2 leading-relaxed"
			>
				{lines.map((line) => (
					<div
						key={line.id}
						className={line.kind === "err" ? "text-rose-400" : undefined}
					>
						{line.kind === "in" ? (
							<>
								<span className="text-orange-500">{PROMPT}</span> {line.body}
							</>
						) : (
							line.body
						)}
					</div>
				))}
				<form onSubmit={submit} className="flex items-center gap-2">
					<label htmlFor="footer-terminal" className="shrink-0 text-orange-500">
						{PROMPT}
					</label>
					<input
						id="footer-terminal"
						ref={input}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={onKeyDown}
						autoComplete="off"
						spellCheck={false}
						placeholder="help"
						className="min-w-0 flex-1 border-none bg-transparent text-stone-100 caret-orange-500 outline-none placeholder:text-stone-600"
					/>
				</form>
			</div>
		</div>
	);
}

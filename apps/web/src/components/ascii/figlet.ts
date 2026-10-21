/** "ANSI Shadow" figlet glyphs for the letters the wordmark needs. */
const GLYPHS: Record<string, string[]> = {
	V: [
		"██╗   ██╗",
		"██║   ██║",
		"██║   ██║",
		"╚██╗ ██╔╝",
		" ╚████╔╝ ",
		"  ╚═══╝  ",
	],
	A: [" █████╗ ", "██╔══██╗", "███████║", "██╔══██║", "██║  ██║", "╚═╝  ╚═╝"],
	L: ["██╗     ", "██║     ", "██║     ", "██║     ", "███████╗", "╚══════╝"],
	Z: ["███████╗", "╚══███╔╝", "  ███╔╝ ", " ███╔╝  ", "███████╗", "╚══════╝"],
	Y: [
		"██╗   ██╗",
		"╚██╗ ██╔╝",
		" ╚████╔╝ ",
		"  ╚██╔╝  ",
		"   ██║   ",
		"   ╚═╝   ",
	],
	" ": ["   ", "   ", "   ", "   ", "   ", "   "],
};

export function figlet(word: string): string[] {
	const rows = ["", "", "", "", "", ""];
	for (const letter of word.toUpperCase()) {
		const glyph = GLYPHS[letter] ?? GLYPHS[" "];
		glyph.forEach((line, i) => {
			rows[i] += line;
		});
	}
	return rows;
}

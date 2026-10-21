import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "../index.css";
import { cn } from "@homepage/ui/lib/utils";
import { Flex } from "@once-ui-system/core";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IntroLoader } from "@/components/motion/intro-loader";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import SmoothScroll from "@/components/motion/smooth-scroll";
import Providers from "@/components/providers";
import SiteHeader from "@/components/sections/site-header";
import SiteFooter from "@/components/site/site-footer";
import { pixelFont } from "@/lib/fonts";
import { getMetadata } from "@/lib/metadata";
import { JsonLd } from "@/resources/metadata/json-ld";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = getMetadata();

// Skips the intro overlay before first paint on repeat visits in a session.
const introScript = `try{if(sessionStorage.getItem("valzy-intro-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-seen")}catch(e){}`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn("font-sans", dmSans.variable, pixelFont.variable)}
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: introScript }} />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
			>
				<SmoothScroll>
					<JsonLd />
					<Analytics />
					<SpeedInsights />
					<main>
						<Providers>
							<IntroLoader />
							<ScrollProgress />
							<Flex
								fillWidth
								fillHeight
								className="bg-border dark:bg-accent-foreground"
								horizontal="center"
								vertical="start"
							>
								<Flex
									fillWidth
									minWidth="100vw"
									padding={1}
									direction="column"
									gap={1}
									horizontal="center"
									vertical="start"
								>
									<SiteHeader />
									{children}
									<SiteFooter />
								</Flex>
							</Flex>
						</Providers>
					</main>
				</SmoothScroll>
			</body>
		</html>
	);
}

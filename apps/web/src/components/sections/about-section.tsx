import { ActionRow } from "@/components/section/action-row";
import {
	SectionHeading,
	SectionRoot,
	SectionText,
} from "@/components/section/section-heading";
import { socials } from "@/resources/socials";
export default function AboutSection({ id }: { id: string }) {
	return (
		<SectionRoot id={id}>
			<SectionHeading before="A little about" highlight="me." />
			<SectionText>
				I'm Valzy Nathaniel, an independent full-stack developer based in
				Indonesia. I'm the founder and sole developer behind JKT48Connect, a
				fan-built ecosystem for JKT48 that spans a Cloudflare Workers API, a
				Next.js dashboard, a React Native mobile app, live streaming
				infrastructure, and an automated QRIS payment gateway, all built and
				maintained solo since 2024. Alongside that, I work across the IT
				divisions of Cavallery, Fritzyforce, and Nayrakuen. <br />
				<br />
				Beyond the code, I'm deeply involved in the JKT48 fan community,
				building tools that help fans follow live streams, theater schedules,
				and member activity in real time. I enjoy working across the entire
				stack, from edge infrastructure and Durable Objects to mobile apps and
				payment systems, and I'm always looking for ways to make the fan
				experience faster, smoother, and more reliable.
			</SectionText>
			<ActionRow
				buttons={[
					{ text: "Email me", boxColor: "bg-orange-500", pattern: "mail", href: socials.email },
					{ text: "DM me on X", boxColor: "bg-teal-500", pattern: "x", href: socials.x },
					{
						text: "Connect on LinkedIn",
						boxColor: "bg-sky-500",
						pattern: "linkedin",
						href: socials.linkedin,
					},
				]}
			/>
		</SectionRoot>
	);
}

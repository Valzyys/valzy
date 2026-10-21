import { Reveal } from "@/components/motion/reveal";
import AboutSection from "@/components/sections/about-section";
import AwardsSection from "@/components/sections/awards-section";
import BlogsSection from "@/components/sections/blogs-section";
import ExperienceSection from "@/components/sections/experience-section";
import ExploreSection from "@/components/sections/explore-section";
import GitHubSection from "@/components/sections/github-section";
import HeroSection from "@/components/sections/hero-section";
import HeroStage from "@/components/sections/hero-stage";
import InsightsSection from "@/components/sections/insights-section";
import MapSection from "@/components/sections/map-section";
import PhotoGrid from "@/components/sections/photo-grid";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import TimerSection from "@/components/sections/timer-section";
import WidgetsSection from "@/components/sections/widgets-section";
import { PageCard } from "@/components/site/page-card";

export default function Home() {
	return (
		<PageCard stage={<HeroStage id="hero" />}>
			<Reveal>
				<HeroSection id="intro" />
			</Reveal>
			<Reveal>
				<GitHubSection id="github" />
			</Reveal>
			<Reveal>
				<PhotoGrid id="photo" />
			</Reveal>
			<Reveal>
				<AboutSection id="about" />
			</Reveal>
			<Reveal>
				<MapSection id="map" />
			</Reveal>
			<Reveal>
				<SkillsSection id="skills" />
			</Reveal>
			<Reveal>
				<ExperienceSection id="experience" />
			</Reveal>
			<Reveal>
				<ProjectsSection id="projects" />
			</Reveal>
			<Reveal>
				<WidgetsSection id="widgets" />
			</Reveal>
			<Reveal>
				<AwardsSection id="awards" />
			</Reveal>
			<Reveal>
				<BlogsSection id="blogs" />
			</Reveal>
			<Reveal>
				<InsightsSection id="insights" />
			</Reveal>
			<Reveal>
				<TimerSection id="timer" />
			</Reveal>
			<ExploreSection id="explore" />
		</PageCard>
	);
}

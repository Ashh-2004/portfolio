import { ProjectCard, type Project } from "./project-card";

const projects: Project[] = [
  {
    title: "Startup India Dashboard",
    summary: "Interactive Power BI dashboard analyzing Indian startup trends (Data cleaned with R).",
    tools: ["Power BI", "R"],
    githubLink: "https://github.com/Ashh-2004",
    previewImage: "https://placehold.co/600x400.png",
    dataAiHint: "dashboard analytics",
  },
  {
    title: "AI Mental Health Chatbot",
    summary: "Gemini-powered NLP chatbot for emotional support and crisis detection.",
    tools: ["Gemini", "NLP", "Python"],
    githubLink: "https://github.com/Ashh-2004",
    previewImage: "https://placehold.co/600x400.png",
    dataAiHint: "chatbot interface",
  },
  {
    title: "Bengaluru Traffic Analysis",
    summary: "Accident trend analysis and regression modeling using Pandas and Matplotlib.",
    tools: ["Pandas", "Matplotlib", "Python"],
    githubLink: "https://github.com/Ashh-2004",
    previewImage: "https://placehold.co/600x400.png",
    dataAiHint: "traffic map",
  },
  {
    title: "Integration of IoT with AI and ML",
    summary: "A term paper exploring the integration of IoT, AI, and Machine Learning, with a focus on intrusion detection systems using DNN and fuzzy logic.",
    tools: ["IoT", "AI/ML", "DNN", "Fuzzy Logic"],
    githubLink: "https://github.com/Ashh-2004",
    previewImage: "https://placehold.co/600x400.png",
    dataAiHint: "security system",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Featured Projects</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            A selection of my work. Click on a project to learn more.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

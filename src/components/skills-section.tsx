import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Code, Database, Gauge, GitBranch, Cloud, LineChart, Speech, FileCog } from "lucide-react";

const skills = {
  languages: {
    icon: Code,
    title: "Languages",
    list: ["Python", "SQL", "Java", "R"],
  },
  tools: {
    icon: Gauge,
    title: "Tools",
    list: ["Pandas", "Matplotlib", "Tableau", "Power BI", "Excel", "GA4"],
  },
  cloud: {
    icon: Cloud,
    title: "Cloud",
    list: ["AWS (S3, EC2, Athena)"],
  },
  versionControl: {
    icon: GitBranch,
    title: "Version Control",
    list: ["Git"],
  },
  concepts: {
    icon: BrainCircuit,
    title: "Concepts",
    list: ["Data Cleaning", "Data Visualization", "Machine Learning", "NLP", "Statistics"],
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="w-full bg-muted py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Technical Skills</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            A showcase of my technical abilities and tools I use to turn data into insights.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(skills).map((category) => (
            <Card key={category.title} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <category.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {category.list.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-base">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

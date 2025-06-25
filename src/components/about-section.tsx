import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/400x400.png"
              alt="M Ashish Ramana"
              width={400}
              height={400}
              className="rounded-full object-cover shadow-lg"
              data-ai-hint="professional photo"
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">About Me</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I’m Ashish Ramana, a Data Analytics student at St. Joseph's University, passionate about transforming raw data into meaningful insights. I thrive on leveraging Python, SQL, and visualization tools like Tableau to solve real-world problems. My drive comes from creating innovative solutions, like AI chatbots and startup dashboards, that make a tangible impact. I’m motivated by continuous learning and collaborating to drive business growth through data.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-bold">Education</h3>
              <div className="relative border-l-2 border-primary/20 pl-6 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[34px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background">
                     <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="font-bold">BCA in Data Analytics</p>
                  <p className="text-sm">St. Joseph's University, Bengaluru</p>
                  <p className="text-sm text-muted-foreground">2022 – 2025</p>
                </div>
              </div>
            </div>
            <Button asChild>
              <Link href="/resume.pdf" target="_blank" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

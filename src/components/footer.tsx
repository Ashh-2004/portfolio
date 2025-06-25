"use client";

import * as React from "react";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const socialLinks = [
    { icon: Github, href: "https://github.com/Ashh-2004", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ashish-ramana-2ash4", label: "LinkedIn" },
];

export function Footer() {
  const [year, setYear] = React.useState<number | string>("");

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t bg-muted">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {year} M Ashish Ramana. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
            {socialLinks.map(({icon: Icon, href, label}) => (
                 <Button key={href} variant="ghost" size="icon" asChild>
                    <Link href={href} target="_blank" aria-label={label}>
                        <Icon className="h-5 w-5" />
                    </Link>
                 </Button>
            ))}
        </div>
      </div>
    </footer>
  );
}

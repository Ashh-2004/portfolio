import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

const contactInfo = [
    { icon: Phone, text: "+91 9964700146", href: "tel:+919964700146" },
    { icon: Mail, text: "ashishramana1708@gmail.com", href: "mailto:ashishramana1708@gmail.com" },
    { icon: Linkedin, text: "linkedin.com/in/ashish-ramana-2ash4", href: "https://www.linkedin.com/in/ashish-ramana-2ash4" },
    { icon: Github, text: "github.com/Ashh-2004", href: "https://github.com/Ashh-2004" },
];

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Get In Touch</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Have a question or want to work together? Feel free to reach out through any of the channels below.
          </p>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="space-y-6">
             {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <item.icon className="h-6 w-6 text-primary" />
                  <Link href={item.href} target="_blank" rel="noopener noreferrer" className="break-all text-lg hover:underline">
                    {item.text}
                  </Link>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
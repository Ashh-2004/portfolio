import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const services = [
  "Data cleaning & transformation",
  "Dashboard creation & reporting",
  "Predictive analytics & visual storytelling",
  "Data-driven problem solving",
];

export function ServicesSection() {
  return (
    <section id="services" className="w-full bg-muted py-12 md:py-24 lg:py-32">
      <div className="container mx-auto flex max-w-7xl justify-center px-4 md:px-6">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">What I Offer</CardTitle>
            <CardDescription className="md:text-xl">
              As a Data Analyst, I provide a range of services to help you make sense of your data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service} className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

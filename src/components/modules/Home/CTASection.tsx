import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const CTASection = () => {
    return (
        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">Ready to bring your ideas to life?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Let &apo s s collaborate on your next project. I &apos m always excited to work on innovative solutions that make a
              real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/resume">View Resume</Link>
              </Button>
            </div>
          </div>
        </section>
    );
};

export default CTASection;
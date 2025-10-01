import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
         <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                    Hi, I'm <span className="text-primary">MD. Riaz Uddin</span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-muted-foreground text-pretty">
                    Full-Stack Developer crafting exceptional digital experiences with modern technologies
                  </p>
                </div>

                <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
                  I specialize in building scalable web applications using React, React Native, Next.js, and TypeScript. With 4+ years
                  of experience, I help businesses transform their ideas into powerful digital solutions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link href="/projects">
                      View My Work
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    <Link href="/contact">
                      <Mail className="mr-2 w-5 h-5" />
                      Get In Touch
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Brahmanbaria, Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Available for projects</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
                  <div className="relative bg-card border border-border rounded-2xl p-8 backdrop-blur-sm">
                    <Image
                      src="/professional-headshot.png"
                      alt="Alex Johnson - Professional Headshot"
                      width={400}
                      height={400}
                      className="w-full h-auto rounded-xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};

export default HeroSection;
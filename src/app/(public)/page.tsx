import CTASection from "@/components/modules/Home/CTASection"
import FeatureProject from "@/components/modules/Home/FeatureProject"
import HeroSection from "@/components/modules/Home/HeroSection"
import RecentBlogPost from "@/components/modules/Home/RecentBlogPost"
import { PersonStructuredData, WebsiteStructuredData } from "@/components/structured-data"
import { generateMetadata } from "@/lib/metadata"

export const metadata = generateMetadata({
  title: "Home",
  description:
    "MD Riaz Uddin - Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable applications and innovative solutions in San Francisco.",
})

export default function HomePage() {

  return (
    <>
      <PersonStructuredData
        name="MD. Riaz Uddin"
        jobTitle="Full-Stack Developer"
        description="Experienced Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable applications and innovative solutions."
        url="https://alexjohnson.dev"
        email="alex.johnson@email.com"
        location="San Francisco, CA"
        image="https://alexjohnson.dev/professional-headshot.png"
        sameAs={[
          "https://github.com/alexjohnson",
          "https://linkedin.com/in/alexjohnson",
          "https://twitter.com/alexjohnsondev",
        ]}
      />
      <WebsiteStructuredData
        name="MD. Riaz Uddin - Full-Stack Developer"
        description="Personal portfolio showcasing full-stack development projects, blog posts, and professional experience."
        url="https://alexjohnson.dev"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection/>
        {/* Featured Projects Section */}
        <FeatureProject/>
        {/* Recent Blog Posts Section */}
        <RecentBlogPost/>
        {/* CTA Section */}
        <CTASection/>
      </div>
    </>
  )
}

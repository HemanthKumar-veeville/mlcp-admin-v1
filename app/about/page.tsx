import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, TrendingUp, Heart, Globe } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Your Company",
  description:
    "Learn about our mission, values, and the team behind Your Company. Discover how we are committed to delivering excellence and innovation in everything we do.",
  openGraph: {
    title: "About Us - Your Company",
    description:
      "Learn about our mission, values, and the team behind Your Company. Discover how we are committed to delivering excellence and innovation in everything we do.",
    url: "https://yourwebsite.com/about",
  },
  alternates: {
    canonical: "https://yourwebsite.com/about",
  },
}

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We are committed to delivering solutions that make a real difference in our clients' businesses.",
  },
  {
    icon: Heart,
    title: "Customer-Centric",
    description: "Our customers are at the heart of everything we do. Their success is our success.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every project, every interaction, and every solution we deliver.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "We embrace cutting-edge technologies and innovative approaches to solve complex challenges.",
  },
]

const stats = [
  { number: "10,000+", label: "Happy Customers" },
  { number: "50+", label: "Team Members" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" },
]

export default function AboutPage() {
  return (
    <>
      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Us - Your Company",
            description: "Learn about our mission, values, and the team behind Your Company.",
            url: "https://yourwebsite.com/about",
            mainEntity: {
              "@type": "Organization",
              name: "Your Company",
              foundingDate: "2020",
              description: "A company committed to delivering excellence and innovation",
              numberOfEmployees: "50+",
              slogan: "Excellence in Innovation",
            },
          }),
        }}
      />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section
          className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
          aria-labelledby="about-hero-heading"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="secondary" className="mb-4">
                About Your Company
              </Badge>
              <h1 id="about-hero-heading" className="text-4xl md:text-6xl font-bold tracking-tight">
                Committed to <span className="text-primary">Excellence</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Since our founding, we have been dedicated to delivering innovative solutions that drive real business
                results. Learn about our journey, our values, and what makes us different.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30" aria-labelledby="stats-heading">
          <div className="container mx-auto px-4">
            <h2 id="stats-heading" className="sr-only">
              Company Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20" aria-labelledby="story-heading">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 id="story-heading" className="text-3xl md:text-4xl font-bold">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Founded in 2020, Your Company began with a simple yet powerful vision: to bridge the gap between
                    innovative technology and practical business solutions. Our founders recognized that many businesses
                    were struggling to adapt to the rapidly changing digital landscape.
                  </p>
                  <p>
                    What started as a small team of passionate technologists has grown into a thriving company serving
                    thousands of clients worldwide. We've maintained our commitment to excellence while scaling our
                    operations and expanding our service offerings.
                  </p>
                  <p>
                    Today, we continue to push the boundaries of what's possible, helping businesses of all sizes
                    achieve their goals through innovative solutions and exceptional service.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-32 w-32 text-primary/60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30" aria-labelledby="values-heading">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 id="values-heading" className="text-3xl md:text-4xl font-bold">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                These values guide every decision we make and every solution we deliver.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20" aria-labelledby="team-heading">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 id="team-heading" className="text-3xl md:text-4xl font-bold">
                Meet Our Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our diverse team of experts brings together decades of experience in technology, business, and
                innovation.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="text-center p-8">
                <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">A Team of Experts</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our team consists of experienced professionals from various backgrounds including software
                  engineering, business strategy, design, and customer success. We work together to ensure every client
                  receives the best possible service and results.
                </p>
                <Button size="lg" asChild>
                  <Link href="/contact">Work With Us</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground" aria-labelledby="about-cta-heading">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 id="about-cta-heading" className="text-3xl md:text-4xl font-bold">
                Ready to Work Together?
              </h2>
              <p className="text-xl opacity-90">
                We'd love to learn more about your business and how we can help you achieve your goals.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-background text-foreground" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

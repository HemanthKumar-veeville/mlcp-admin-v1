import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Your Company",
  description:
    "Get in touch with Your Company. We are here to help you with any questions or to discuss how we can help your business grow. Contact us today.",
  openGraph: {
    title: "Contact Us - Your Company",
    description:
      "Get in touch with Your Company. We are here to help you with any questions or to discuss how we can help your business grow.",
    url: "https://yourwebsite.com/contact",
  },
  alternates: {
    canonical: "https://yourwebsite.com/contact",
  },
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Business Street", "Business City, BC 12345", "United States"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "Mon-Fri: 9AM-6PM EST"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@yourcompany.com", "support@yourcompany.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Closed"],
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Structured Data for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us - Your Company",
            description: "Get in touch with Your Company for any questions or business inquiries.",
            url: "https://yourwebsite.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "Your Company",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "info@yourcompany.com",
                availableLanguage: "English",
              },
            },
          }),
        }}
      />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section
          className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
          aria-labelledby="contact-hero-heading"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Badge variant="secondary" className="mb-4">
                Contact Us
              </Badge>
              <h1 id="contact-hero-heading" className="text-4xl md:text-6xl font-bold tracking-tight">
                Let's Start a <span className="text-primary">Conversation</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We're here to help you succeed. Whether you have questions about our services or want to discuss your
                next project, we'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-20" aria-labelledby="contact-form-heading">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-8">
                <div>
                  <h2 id="contact-form-heading" className="text-3xl font-bold mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                    <CardDescription>We'll respond to your message as soon as possible.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" action="/api/contact" method="POST">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            placeholder="John"
                            aria-describedby="firstName-error"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            placeholder="Doe"
                            aria-describedby="lastName-error"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          aria-describedby="email-error"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" type="text" placeholder="Your Company Name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          placeholder="How can we help you?"
                          aria-describedby="subject-error"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          placeholder="Tell us more about your project or question..."
                          className="min-h-[120px]"
                          aria-describedby="message-error"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground text-lg">
                    Prefer to reach out directly? Here are all the ways you can contact us.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                            <div className="space-y-1">
                              {info.details.map((detail, detailIndex) => (
                                <p key={detailIndex} className="text-muted-foreground">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Map Placeholder */}
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="text-muted-foreground">Interactive Map</p>
                        <p className="text-sm text-muted-foreground">123 Business Street, Business City, BC 12345</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Quick answers to common questions about our services and process.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How quickly do you respond to inquiries?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24 hours during business days. For urgent matters,
                    please call us directly at +1 (555) 123-4567.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What information should I include in my message?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Please include details about your project, timeline, budget range, and any specific requirements.
                    The more information you provide, the better we can assist you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Do you offer free consultations?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! We offer free initial consultations to discuss your project and how we can help. Contact us to
                    schedule your consultation today.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Cpu, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">About Think AI</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We are dedicated to making the power of generative artificial intelligence accessible and useful for everyone, from curious beginners to seasoned developers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Target className="h-10 w-10 text-primary" />
            <CardTitle className="font-headline text-xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to democratize access to cutting-edge AI. We believe that by providing intuitive and powerful tools, we can empower individuals and teams to innovate, learn, and solve complex problems more effectively.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Cpu className="h-10 w-10 text-primary" />
            <CardTitle className="font-headline text-xl">Our Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Think AI is built on a modern, robust technology stack. We utilize Next.js for a fast frontend experience and leverage Google's powerful Genkit and Gemini models to provide state-of-the-art conversational AI capabilities.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-10 w-10 text-primary" />
            <CardTitle className="font-headline text-xl">Our Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are more than just a platform; we are a growing community of AI enthusiasts, developers, and creators. We encourage you to explore, connect with others on our Developer Showcase, and be a part of the future of AI.
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="text-center p-8 bg-card rounded-lg">
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-headline mb-4">Get Started with Think AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to explore the possibilities? Dive into our conversational AI, check out our developer community, or sign up to unlock the full potential of the platform. Your journey into AI starts here.
          </p>
      </div>

    </div>
  );
}

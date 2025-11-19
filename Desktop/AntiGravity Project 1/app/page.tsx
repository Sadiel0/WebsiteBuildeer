import Link from "next/link"
import { Sparkles, Calendar, Zap, TrendingUp } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-primary-animated opacity-20" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_2s]" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Realtor Copilot
              </span>
            </div>
            <Link
              href="/generate"
              className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              Go to Dashboard
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 animate-[fade-in-up_0.6s_ease-out]">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">AI-Powered Content Generation</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-[fade-in-up_0.6s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI-Powered Content
              </span>
              <br />
              <span className="text-foreground">for Real Estate Agents</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-[fade-in-up_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
              Generate listing hooks, scripts, and captions in seconds. Schedule your weekly content with ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fade-in-up_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
              <Link
                href="/generate"
                className="group px-8 py-4 rounded-xl gradient-primary text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Generating Free
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Link>

              <Link
                href="/calendar"
                className="px-8 py-4 rounded-xl glass border border-primary/30 text-foreground font-semibold text-lg transition-all hover:scale-105 hover:border-primary/50 hover:bg-primary/5"
              >
                View Calendar
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl glass border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">AI Content Generation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate engaging hooks, video scripts, and captions tailored to your listings in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl glass border border-accent/20 hover:border-accent/40 transition-all hover:scale-105 hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Weekly Calendar</h3>
              <p className="text-muted-foreground leading-relaxed">
                Plan and schedule your content for the entire week with our intuitive calendar view.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl glass border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Grow Your Brand</h3>
              <p className="text-muted-foreground leading-relaxed">
                Consistent, high-quality content helps you build authority and attract more clients.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>&copy; 2024 Realtor Copilot. Built with AI for real estate professionals.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

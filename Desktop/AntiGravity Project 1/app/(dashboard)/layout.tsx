import { DashboardNav } from "@/components/dashboard-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col relative overflow-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 gradient-primary-animated opacity-10 pointer-events-none" />
            <div className="fixed top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite] pointer-events-none" />
            <div className="fixed bottom-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite_2s] pointer-events-none" />

            <div className="relative z-10 flex min-h-screen flex-col space-y-6">
                {/* Header with glassmorphism */}
                <header className="sticky top-0 z-40 border-b border-border/50 glass">
                    <div className="container flex h-16 items-center justify-between py-4">
                        <div className="flex gap-6 md:gap-10">
                            <Link href="/" className="flex items-center space-x-2 group">
                                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="inline-block font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Realtor Copilot
                                </span>
                            </Link>
                        </div>
                        <UserAccountNav />
                    </div>
                </header>

                <div className="container grid flex-1 gap-12 md:grid-cols-[220px_1fr]">
                    {/* Glassmorphic sidebar */}
                    <aside className="hidden w-[220px] flex-col md:flex">
                        <div className="sticky top-20 glass rounded-xl p-4 border border-primary/20">
                            <DashboardNav />
                        </div>
                    </aside>

                    <main className="flex w-full flex-1 flex-col overflow-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

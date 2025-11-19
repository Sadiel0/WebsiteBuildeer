"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Calendar, PenTool, User } from "lucide-react"

const items = [
    {
        title: "Generate Content",
        href: "/generate",
        icon: PenTool,
    },
    {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
    },
    {
        title: "Profile",
        href: "/profile",
        icon: User,
    },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    className?: string
}

export function DashboardNav({ className, ...props }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2",
                className
            )}
            {...props}
        >
            {items.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            isActive
                                ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                                : "hover:bg-accent/10 hover:text-accent-foreground border border-transparent",
                            "justify-start transition-all hover:scale-105 hover:translate-x-1"
                        )}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                    </Link>
                )
            })}
        </nav>
    )
}

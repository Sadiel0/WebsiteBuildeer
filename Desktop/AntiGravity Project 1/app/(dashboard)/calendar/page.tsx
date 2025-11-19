import { CalendarView } from "@/components/calendar/calendar-view"

export default function CalendarPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Weekly Calendar</h1>
                <p className="text-muted-foreground">Plan your content schedule for the week.</p>
            </div>
            <CalendarView />
        </div>
    )
}

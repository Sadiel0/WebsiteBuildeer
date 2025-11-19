export default function TestStylePage() {
    return (
        <div className="p-10 space-y-4">
            <h1 className="text-4xl font-bold text-primary">Test Style Page</h1>
            <div className="p-6 bg-card text-card-foreground border rounded-lg shadow-sm">
                <p>This is a card component.</p>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Primary Button
            </button>
            <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-muted rounded flex items-center justify-center">Muted</div>
                <div className="h-20 bg-accent rounded flex items-center justify-center">Accent</div>
                <div className="h-20 bg-secondary rounded flex items-center justify-center">Secondary</div>
            </div>
        </div>
    )
}

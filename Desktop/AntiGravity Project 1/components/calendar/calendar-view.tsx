"use client"

import { useState, useEffect } from 'react'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Loader2, ChevronLeft, ChevronRight, Download } from 'lucide-react'

const TIME_SLOTS = ['MORNING', 'AFTERNOON', 'EVENING']

export function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [slots, setSlots] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<{ date: Date, timeSlot: string, contentItemId?: string } | null>(null)
    const [editNotes, setEditNotes] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [savedItems, setSavedItems] = useState<any[]>([])

    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }) // Monday
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i))

    useEffect(() => {
        fetchSlots()
        fetchSavedItems()
    }, [currentDate])

    const fetchSlots = async () => {
        setIsLoading(true)
        const start = weekDays[0].toISOString()
        const end = weekDays[6].toISOString()
        try {
            const res = await fetch(`/api/calendar/slots?start=${start}&end=${end}`)
            const data = await res.json()
            setSlots(data.slots || [])
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchSavedItems = async () => {
        try {
            const res = await fetch('/api/content')
            const data = await res.json()
            setSavedItems(data.items || [])
        } catch (error) {
            console.error(error)
        }
    }

    const handleSlotClick = (date: Date, timeSlot: string) => {
        const existingSlot = slots.find(s => isSameDay(new Date(s.date), date) && s.timeSlot === timeSlot)
        setEditNotes(existingSlot?.notes || '')
        setSelectedSlot({ date, timeSlot, contentItemId: existingSlot?.contentItemId || '' })
    }

    const handleSaveSlot = async () => {
        if (!selectedSlot) return
        setIsSaving(true)
        try {
            const res = await fetch('/api/calendar/slots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: selectedSlot.date.toISOString(),
                    timeSlot: selectedSlot.timeSlot,
                    notes: editNotes,
                    contentItemId: selectedSlot.contentItemId || null
                })
            })
            if (res.ok) {
                await fetchSlots()
                setSelectedSlot(null)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleExport = () => {
        const start = weekDays[0].toISOString()
        const end = weekDays[6].toISOString()
        window.open(`/api/calendar/export?start=${start}&end=${end}`, '_blank')
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-muted rounded-lg p-1">
                        <Button variant="ghost" size="icon" onClick={() => setCurrentDate(addDays(currentDate, -7))} className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="px-4 text-sm font-medium min-w-[140px] text-center">
                            {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d')}
                        </span>
                        <Button variant="ghost" size="icon" onClick={() => setCurrentDate(addDays(currentDate, 7))} className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Button onClick={handleExport} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Week
                </Button>
            </div>

            <Card className="overflow-hidden">
                <div className="grid grid-cols-8 border-b bg-muted/40">
                    <div className="col-span-1 p-4 border-r flex items-center justify-center text-sm font-medium text-muted-foreground">
                        Time
                    </div>
                    {weekDays.map(day => (
                        <div key={day.toString()} className={`col-span-1 p-4 text-center border-r last:border-r-0 ${isSameDay(day, new Date()) ? 'bg-primary/5' : ''}`}>
                            <div className="text-xs font-medium text-muted-foreground uppercase mb-1">{format(day, 'EEE')}</div>
                            <div className={`text-lg font-bold ${isSameDay(day, new Date()) ? 'text-primary' : ''}`}>{format(day, 'd')}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-8">
                    {TIME_SLOTS.map((timeSlot, index) => (
                        <>
                            <div key={timeSlot} className={`col-span-1 p-4 border-r flex items-center justify-center text-xs font-medium text-muted-foreground bg-muted/10 ${index !== TIME_SLOTS.length - 1 ? 'border-b' : ''}`}>
                                {timeSlot}
                            </div>
                            {weekDays.map((day, dayIndex) => {
                                const slot = slots.find(s => isSameDay(new Date(s.date), day) && s.timeSlot === timeSlot)
                                const isToday = isSameDay(day, new Date())
                                return (
                                    <div
                                        key={`${day}-${timeSlot}`}
                                        className={`
                                            col-span-1 min-h-[120px] p-3 border-r last:border-r-0 cursor-pointer transition-all duration-200 group relative
                                            ${index !== TIME_SLOTS.length - 1 ? 'border-b' : ''}
                                            ${slot ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/50'}
                                            ${isToday ? 'bg-accent/20' : ''}
                                        `}
                                        onClick={() => handleSlotClick(day, timeSlot)}
                                    >
                                        {slot ? (
                                            <div className="space-y-2">
                                                {slot.contentItem && (
                                                    <Badge variant="secondary" className="w-full justify-center text-[10px] py-0 h-5 bg-white shadow-sm">
                                                        AI Content
                                                    </Badge>
                                                )}
                                                {slot.notes && (
                                                    <p className="text-xs text-muted-foreground line-clamp-4 leading-relaxed">
                                                        {slot.notes}
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                    <span className="text-xl text-muted-foreground font-light">+</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </>
                    ))}
                </div>
            </Card>

            <Dialog open={!!selectedSlot} onOpenChange={(open) => !open && setSelectedSlot(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Schedule</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <Label>Assign Content</Label>
                            <Select
                                value={selectedSlot?.contentItemId || 'none'}
                                onValueChange={(value) => setSelectedSlot(prev => prev ? ({ ...prev, contentItemId: value === 'none' ? '' : value }) : null)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select saved content..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {savedItems.map(item => {
                                        const data = JSON.parse(item.inputData)
                                        const label = item.type === 'LISTING'
                                            ? `Listing: ${data.propertyType} - ${data.price}`
                                            : `Idea: ${data.targetAudience}`
                                        return <SelectItem key={item.id} value={item.id}>{label}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Notes</Label>
                            <Textarea
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                placeholder="Add notes or paste content here..."
                                className="min-h-[150px]"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedSlot(null)}>Cancel</Button>
                        <Button onClick={handleSaveSlot} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

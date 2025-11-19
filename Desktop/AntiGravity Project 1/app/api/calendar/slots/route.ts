import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserId } from '@/lib/auth'

export async function GET(request: Request) {
    const userId = await getUserId()
    const { searchParams } = new URL(request.url)
    const start = searchParams.get('start') // ISO date string
    const end = searchParams.get('end') // ISO date string

    try {
        const slots = await prisma.calendarSlot.findMany({
            where: {
                userId,
                date: {
                    gte: start ? new Date(start) : undefined,
                    lte: end ? new Date(end) : undefined,
                }
            },
            include: {
                contentItem: true
            }
        })
        return NextResponse.json({ slots })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const userId = await getUserId()

    try {
        const { date, timeSlot, contentItemId, notes } = await request.json()

        const slot = await prisma.calendarSlot.upsert({
            where: {
                userId_date_timeSlot: {
                    userId,
                    date: new Date(date),
                    timeSlot
                }
            },
            update: {
                contentItemId,
                notes
            },
            create: {
                userId,
                date: new Date(date),
                timeSlot,
                contentItemId,
                notes
            }
        })

        return NextResponse.json({ slot })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

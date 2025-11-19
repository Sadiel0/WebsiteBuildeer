import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserId } from '@/lib/auth'

export async function GET(request: Request) {
    const userId = await getUserId()
    const { searchParams } = new URL(request.url)
    const start = searchParams.get('start')
    const end = searchParams.get('end')

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
            },
            orderBy: {
                date: 'asc'
            }
        })

        let markdown = `# Content Calendar (${start} - ${end})\n\n`

        slots.forEach(slot => {
            const dateStr = new Date(slot.date).toLocaleDateString()
            markdown += `## ${dateStr} - ${slot.timeSlot}\n`
            if (slot.contentItem) {
                const content = JSON.parse(slot.contentItem.outputData)
                if (slot.contentItem.type === 'LISTING') {
                    markdown += `**Hook:** ${content.hooks[0]}\n\n`
                    markdown += `**Caption:** ${content.captions[0]}\n\n`
                    markdown += `**Hashtags:** ${content.hashtags.join(' ')}\n`
                } else {
                    if (Array.isArray(content)) {
                        markdown += `**Topic:** ${content[0].topic}\n`
                        if (content[0].script) markdown += `**Script:** ${content[0].script}\n`
                    } else {
                        markdown += `**Content:** ${JSON.stringify(content)}\n`
                    }
                }
            }
            if (slot.notes) {
                markdown += `**Notes:** ${slot.notes}\n`
            }
            markdown += `\n---\n\n`
        })

        return new NextResponse(markdown, {
            headers: {
                'Content-Type': 'text/markdown',
                'Content-Disposition': 'attachment; filename="calendar-export.md"'
            }
        })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

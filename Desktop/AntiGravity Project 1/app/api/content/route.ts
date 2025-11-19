import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserId } from '@/lib/auth'

export async function GET(request: Request) {
    const userId = await getUserId()

    try {
        const items = await prisma.generatedContentItem.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50 // Limit to last 50 items for now
        })
        return NextResponse.json({ items })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserId } from '@/lib/auth'

export async function GET(request: Request) {
    const userId = await getUserId()

    try {
        const profile = await prisma.realtorProfile.findUnique({
            where: { userId },
        })

        return NextResponse.json({ profile })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const userId = await getUserId()

    try {
        const data = await request.json()

        const profile = await prisma.realtorProfile.upsert({
            where: { userId },
            update: {
                ...data,
                yearsExperience: parseInt(data.yearsExperience),
            },
            create: {
                userId,
                ...data,
                yearsExperience: parseInt(data.yearsExperience),
            },
        })

        return NextResponse.json({ profile })
    } catch (error) {
        console.error('Profile update error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

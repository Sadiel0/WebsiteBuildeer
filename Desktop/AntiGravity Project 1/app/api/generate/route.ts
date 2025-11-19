import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserId } from '@/lib/auth'
import { generateListingContent, generateIdeaContent, ListingData, IdeaData } from '@/lib/ai'

export async function POST(request: Request) {
    const userId = await getUserId()

    try {
        const { type, data } = await request.json()

        const profile = await prisma.realtorProfile.findUnique({
            where: { userId },
        })

        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
        }

        let result
        if (type === 'LISTING') {
            result = await generateListingContent(data as ListingData, profile)
        } else if (type === 'IDEA') {
            result = await generateIdeaContent(data as IdeaData, profile)
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
        }

        // Store the result in the database
        const savedItem = await prisma.generatedContentItem.create({
            data: {
                userId,
                type,
                inputData: JSON.stringify(data),
                outputData: JSON.stringify(result),
            },
        })

        return NextResponse.json({ result, id: savedItem.id })
    } catch (error) {
        console.error('Generation error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

import { RealtorProfile } from "@prisma/client"

export interface ListingData {
    propertyType: string
    price: string
    bedrooms: number
    bathrooms: number
    keyFeatures: string
    targetAudience?: string
    platform: string
}

export interface IdeaData {
    targetAudience: string
    marketCity: string
    marketState: string
}

export interface GeneratedContentResult {
    hooks: string[]
    script: string
    captions: string[]
    hashtags: string[]
}

export interface IdeaResult {
    category: string
    topic: string
    script?: string
    caption?: string
    hooks?: string[]
}

export async function generateListingContent(data: ListingData, profile: RealtorProfile): Promise<GeneratedContentResult> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
        hooks: [
            `Stop scrolling if you're looking for a ${data.propertyType} in ${profile.marketCity}!`,
            "You won't believe the price of this new listing!",
            `Dreaming of a ${data.bedrooms}-bedroom home? Check this out.`
        ],
        script: `Hey everyone, ${profile.name} here! Check out this amazing ${data.propertyType} in ${profile.marketCity}. It features ${data.keyFeatures} and is listed for only ${data.price}. DM me for a tour!`,
        captions: [
            `New listing alert! 🚨 ${data.propertyType} in ${profile.marketCity}. #realestate`,
            `Just listed! ${data.bedrooms} bed, ${data.bathrooms} bath. DM for details!`,
            `Your dream home awaits in ${profile.marketCity}. ✨`
        ],
        hashtags: ["#realestate", `#${profile.marketCity.replace(/\s/g, '')}RealEstate`, "#newlisting", "#dreamhome"]
    }
}

export async function generateIdeaContent(data: IdeaData, profile: RealtorProfile): Promise<IdeaResult[]> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1500))
    return Array(10).fill(null).map((_, i) => ({
        category: ["Educational", "Myth-busting", "Local/Community", "Market insights"][i % 4],
        topic: `Content Idea ${i + 1} for ${data.targetAudience}`,
        script: i < 3 ? "Here is a sample script for this idea..." : undefined,
        caption: i < 3 ? "Sample caption..." : undefined,
        hooks: i < 3 ? ["Hook 1", "Hook 2"] : undefined
    }))
}

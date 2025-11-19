"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { GeneratedResult } from "./generated-result"

export function ListingForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setResult(null)

        const formData = new FormData(event.currentTarget)
        const data = {
            propertyType: formData.get('propertyType'),
            price: formData.get('price'),
            bedrooms: parseInt(formData.get('bedrooms') as string),
            bathrooms: parseInt(formData.get('bathrooms') as string),
            keyFeatures: formData.get('keyFeatures'),
            targetAudience: formData.get('targetAudience'),
            platform: formData.get('platform'),
        }

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'LISTING', data }),
            })

            if (!response.ok) throw new Error('Generation failed')

            const json = await response.json()
            setResult(json.result)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="propertyType">Property Type</Label>
                                <Input id="propertyType" name="propertyType" placeholder="e.g. Condo, SFH" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" name="price" placeholder="$500,000" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="bedrooms">Bedrooms</Label>
                                <Input id="bedrooms" name="bedrooms" type="number" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bathrooms">Bathrooms</Label>
                                <Input id="bathrooms" name="bathrooms" type="number" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="keyFeatures">Key Features</Label>
                            <Textarea id="keyFeatures" name="keyFeatures" placeholder="Granite countertops, pool, close to schools..." required className="min-h-[100px]" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
                                <Input id="targetAudience" name="targetAudience" placeholder="Override profile default" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="platform">Platform</Label>
                                <Select name="platform" defaultValue="Instagram">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select platform" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Instagram">Instagram</SelectItem>
                                        <SelectItem value="TikTok">TikTok</SelectItem>
                                        <SelectItem value="YouTube">YouTube</SelectItem>
                                        <SelectItem value="Facebook">Facebook</SelectItem>
                                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Content
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result && <GeneratedResult result={result} type="LISTING" />}
        </div>
    )
}

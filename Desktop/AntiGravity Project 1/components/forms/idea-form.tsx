"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { GeneratedResult } from "./generated-result"

export function IdeaForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setResult(null)

        const formData = new FormData(event.currentTarget)
        const data = {
            targetAudience: formData.get('targetAudience'),
            marketCity: formData.get('marketCity'),
            marketState: formData.get('marketState'),
        }

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'IDEA', data }),
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
                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Input id="targetAudience" name="targetAudience" placeholder="e.g. First-time buyers" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="marketCity">Market City</Label>
                                <Input id="marketCity" name="marketCity" placeholder="City" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="marketState">Market State</Label>
                                <Input id="marketState" name="marketState" placeholder="State" required />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Ideas
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {result && <GeneratedResult result={result} type="IDEA" />}
        </div>
    )
}

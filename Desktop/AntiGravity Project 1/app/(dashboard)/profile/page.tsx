'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'LinkedIn']

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        marketCity: '',
        marketState: '',
        yearsExperience: '',
        targetAudience: '',
        preferredPlatforms: [] as string[]
    })

    useEffect(() => {
        setIsLoading(true)
        fetch('/api/user/profile')
            .then(res => res.json())
            .then(data => {
                if (data.profile) {
                    setFormData({
                        ...data.profile,
                        yearsExperience: data.profile.yearsExperience.toString(),
                        preferredPlatforms: data.profile.preferredPlatforms ? data.profile.preferredPlatforms.split(',') : []
                    })
                }
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false))
    }, [])

    const handlePlatformChange = (platform: string, checked: boolean) => {
        setFormData(prev => {
            if (checked) {
                return { ...prev, preferredPlatforms: [...prev.preferredPlatforms, platform] }
            } else {
                return { ...prev, preferredPlatforms: prev.preferredPlatforms.filter(p => p !== platform) }
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            const res = await fetch('/api/user/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    preferredPlatforms: formData.preferredPlatforms.join(',')
                })
            })
            if (!res.ok) throw new Error('Failed to save')
            // Show success message or toast
            alert('Profile saved!')
        } catch (error) {
            console.error(error)
            alert('Error saving profile')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Realtor Profile</CardTitle>
                    <CardDescription>Set up your profile to get personalized content.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="yearsExperience">Years Experience</Label>
                                <Input
                                    id="yearsExperience"
                                    type="number"
                                    value={formData.yearsExperience}
                                    onChange={e => setFormData({ ...formData, yearsExperience: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="marketCity">Market City</Label>
                                <Input
                                    id="marketCity"
                                    value={formData.marketCity}
                                    onChange={e => setFormData({ ...formData, marketCity: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="marketState">Market State</Label>
                                <Input
                                    id="marketState"
                                    value={formData.marketState}
                                    onChange={e => setFormData({ ...formData, marketState: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Textarea
                                id="targetAudience"
                                placeholder="e.g. First-time homebuyers, luxury investors..."
                                value={formData.targetAudience}
                                onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Preferred Platforms</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {PLATFORMS.map(platform => (
                                    <div key={platform} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={platform}
                                            checked={formData.preferredPlatforms.includes(platform)}
                                            onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                                        />
                                        <label htmlFor={platform} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {platform}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Profile
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

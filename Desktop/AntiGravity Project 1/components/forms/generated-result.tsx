"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, Sparkles } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface GeneratedResultProps {
    result: any
    type: 'LISTING' | 'IDEA'
}

export function GeneratedResult({ result, type }: GeneratedResultProps) {
    const [copied, setCopied] = useState<string | null>(null)

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text)
        setCopied(key)
        setTimeout(() => setCopied(null), 2000)
    }

    if (type === 'LISTING') {
        return (
            <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Generated Content</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">Video Script</CardTitle>
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.script, 'script')}>
                                {copied === 'script' ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                                Copy Script
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap text-sm leading-relaxed font-mono">
                                {result.script}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">Hooks</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {result.hooks.map((hook: string, i: number) => (
                                <div key={i} className="relative p-3 bg-muted/50 rounded-md group hover:bg-muted transition-colors">
                                    <p className="text-sm pr-8">{hook}</p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => copyToClipboard(hook, `hook-${i}`)}
                                    >
                                        {copied === `hook-${i}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">Hashtags</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-3 bg-muted/50 rounded-md group relative">
                                <p className="text-sm text-muted-foreground leading-relaxed">{result.hashtags.join(' ')}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => copyToClipboard(result.hashtags.join(' '), 'hashtags')}
                                >
                                    {copied === 'hashtags' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg font-medium">Captions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-3">
                            {result.captions.map((caption: string, i: number) => (
                                <div key={i} className="relative p-4 bg-muted/50 rounded-md group hover:bg-muted transition-colors flex flex-col justify-between h-full">
                                    <p className="text-sm whitespace-pre-wrap mb-4">{caption}</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full mt-auto"
                                        onClick={() => copyToClipboard(caption, `caption-${i}`)}
                                    >
                                        {copied === `caption-${i}` ? <Check className="mr-2 h-3 w-3" /> : <Copy className="mr-2 h-3 w-3" />}
                                        Copy
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (type === 'IDEA') {
        return (
            <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Generated Ideas</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {result.map((item: any, i: number) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start gap-2">
                                    <CardTitle className="text-base font-semibold leading-tight">{item.topic}</CardTitle>
                                    <Badge variant="secondary" className="shrink-0">{item.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                {item.hooks && (
                                    <div className="space-y-1">
                                        <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">Hook</span>
                                        <p className="bg-muted/50 p-2 rounded-md">{item.hooks[0]}</p>
                                    </div>
                                )}
                                {item.script && (
                                    <div className="space-y-1">
                                        <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">Script Concept</span>
                                        <p className="text-muted-foreground line-clamp-3">{item.script}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return null
}

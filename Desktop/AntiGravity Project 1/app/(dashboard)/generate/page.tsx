import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListingForm } from "@/components/forms/listing-form"
import { IdeaForm } from "@/components/forms/idea-form"

export default function GeneratePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Content Generator</h1>
                <p className="text-muted-foreground">Generate engaging social media content for your listings or get new ideas.</p>
            </div>

            <Tabs defaultValue="listing" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="listing">Listing Content</TabsTrigger>
                    <TabsTrigger value="idea">Idea Generator</TabsTrigger>
                </TabsList>
                <TabsContent value="listing">
                    <ListingForm />
                </TabsContent>
                <TabsContent value="idea">
                    <IdeaForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { AddProduct } from "../../_actions/product"

export function ProductForm() {

    const [pricePaidInPaisa , setpricePaidInPaisa] = useState<number | undefined>()

    return (
        <form action={AddProduct} className="space-y-8">
            
            <div className="space-y-2">
                <Label 
                    htmlFor="name"> Name 
                </Label>
                <Input 
                    type="text" 
                    id="name" 
                    name="required" />
            </div>

            <div className="space-y-2">
                <Label 
                    htmlFor="pricePaidInPaisa"> Price In Paisa 
                    </Label>
                <Input 
                    type="number" 
                    id="pricePaidInPaisa" 
                    name="pricePaidInPaisa" 
                    required 
                    value={pricePaidInPaisa} 
                    onChange={
                        e => setpricePaidInPaisa(Number(e.target.value) || undefined )} />
            </div>

            <div className="text-muted-foreground">
                {
                    FormatCurrency((pricePaidInPaisa || 0 ) / 100 )
                }
            </div>

            <div className="space-y-2">
                <Label 
                    htmlFor="description"> Description 
                </Label>
                <Textarea 
                    id="description" 
                    name="description"
                    required />
            </div>

            <div className="space-y-2">
                <Label 
                    htmlFor="file"> File 
                </Label>
                <Input 
                    type="file" 
                    id="file" 
                    name="file"
                    required />
            </div>

            <div className="space-y-2">
                <Label 
                    htmlFor="image"> Image 
                </Label>
                <Input 
                    type="file" 
                    id="image" 
                    name="image"
                    required />
            </div>

            <Button type="submit"> Save </Button>

        </form>
    )
}

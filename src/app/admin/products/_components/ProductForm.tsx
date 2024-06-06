"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { AddProduct } from "../../_actions/product"
import { useFormState, useFormStatus } from "react-dom"

export function ProductForm() {

    const [ error , action ] = useFormState(AddProduct, {})
    const [ pricePaidInPaisa , setpricePaidInPaisa ] = useState<number | undefined>()

    return (
        <form action={action} className="space-y-8">

{/* Name             */}
            <div className="space-y-2">
                <Label htmlFor="name"> Name </Label>
                <Input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    // defaultValue={product?.name || ""}
                    />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>

{/* Model No. */}
            <div className="space-y-2">
                <Label htmlFor="model"> Model No. </Label>
                <Input 
                    type="text" 
                    id="model" 
                    name="model"
                    required
                    // defaultValue={product?.name || ""}
                    />
                {error.model && <div className="text-destructive">{error.model}</div>}
            </div>

{/* Owner */}
            <div className="space-y-2">
                <Label htmlFor="owner"> Owner </Label>
                <Input 
                    type="text" 
                    id="owner" 
                    name="owner"
                    required
                    // defaultValue={product?.name || ""}
                    />
                {error.owner && <div className="text-destructive">{error.owner}</div>}
            </div>

{/* Driven */}
            <div className="space-y-2">
                <Label htmlFor="driven"> Driven </Label>
                <Input 
                    type="number" 
                    id="driven" 
                    name="driven"
                    required
                    // defaultValue={product?.name || ""}
                    />
                {error.driven && <div className="text-destructive">{error.driven}</div>}
            </div>

{/* PricePaidInPaisa */}
            <div className="space-y-2">
                <Label htmlFor="pricePaidInPaisa"> Price In Ruppes </Label>
                <Input 
                    type="number" 
                    id="pricePaidInPaisa" 
                    name="pricePaidInPaisa" 
                    required 
                    value={pricePaidInPaisa} 
                    onChange={
                        e => setpricePaidInPaisa(Number(e.target.value) || undefined )} />
                {error.pricePaidInPaisa && <div className="text-destructive">{error.pricePaidInPaisa}</div>}
            </div>

            <div className="text-muted-foreground">
                {
                    FormatCurrency((pricePaidInPaisa || 0 ) / 100 )
                }
            </div>

{/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description"> Description </Label>
                <Textarea 
                    id="description" 
                    name="description"
                    required />
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>

{/* File */}
            <div className="space-y-2">
                <Label htmlFor="file"> File </Label>
                <Input 
                    type="file" 
                    id="file" 
                    name="file"
                    required />
                {error.file && <div className="text-destructive">{error.file}</div>}
            </div>

{/* Image */}
            <div className="space-y-2">
                <Label htmlFor="image"> Image </Label>
                <Input 
                    type="file" 
                    id="image" 
                    name="image"
                    required />
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>

            <SubmitButton />

        </form>
    )
}

function SubmitButton () {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={ pending } > { pending ? "Saving..." : "Save" } 
        </Button>
}

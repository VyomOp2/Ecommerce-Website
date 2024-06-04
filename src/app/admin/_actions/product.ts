"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { redirect } from "next/navigation"

const FileSchema = z.instanceof(File , { message : "Required" })
const ImageSchema = FileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const AddSchema = z.object( { 
    name: z.string().min(3),
    description: z.string().min(5),
    pricePaidInPaisa: z.coerce.number().int().min(2),
    file: FileSchema.refine(file => file.size > 0 , "Required"),
    image: ImageSchema.refine(file => file.size > 0 , "Required")
})

export async function AddProduct(formData: FormData) {
    const Result = AddSchema.safeParse(Object.fromEntries(formData.entries()))

    if(Result.success === false) {
        return Result.error.formErrors.fieldErrors
    }

    const data = Result.data

    await fs.mkdir("products" , { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath , Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products" , { recursive: true })
    const imagePath = `products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public/${imagePath}` , Buffer.from(await data.image.arrayBuffer()))

    await db.product.create({
        data: {
            name: data.name,
            description: data.description,
            pricePaidInPaisa: data.pricePaidInPaisa,
            filePath,
            imagePath
        }
    })

    redirect("/admin/products")
}

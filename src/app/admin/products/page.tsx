"use client"
import { PageHeader } from "../_components/PageHeader"
import Link  from "next/link"
import { 
    Table , 
    TableBody , 
    TableCell , 
    TableHead , 
    TableHeader , 
    TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { 
    CheckCircle2, 
    MoreVertical, 
    XCircle 
} from "lucide-react"
import { FormatCurrency, FormatNumber } from "@/lib/formatters"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
    ActiveToggleDropDownItem, 
    DeleteDropDownItem 
} from "./_components/ProductActions"

export default function AdminProductsPage() {
        return (
            <>
                <div className="flex justify-between items-center gap-4">
                    <PageHeader>Products</PageHeader>
                    <Button asChild>
                        <Link href="/admin/products/new">Add New Product</Link>
                    </Button>
                </div>
                <ProductsTable />
            </>
        )
    }

async function ProductsTable () {
    
    const products = await db.product.findMany({ select: {
        id: true,
        name: true,
        model: true,
        owner: true,
        driven: true,
        priceInRupee:true,
        isAvailableForPurchase: true,
        order:true,
        quantity: true,
        filePath: true,
        imagePath: true,
        _count: { select:{
            orders: true
        } }
    },
    orderBy: { name: "asc" } 
})

    if ( products.length === 0 )
        return <p>No Products Found</p>
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available For Purchase</span> 
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Model No.</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Driven (km)</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map( product => (
                    <TableRow key={product.id}>
                        <TableCell>
                        {product.isAvailableForPurchase ? (
                                <>
                                    <span className="sr-only">Available</span>
                                    <CheckCircle2 className="stroke-green"/>
                                </>
                            ) : (
                                <>
                                    <span className="sr-only">Unavailable</span>
                                    <XCircle className="stroke-destructive"/>
                                </>
                            )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.model}</TableCell>
                        <TableCell>{product.owner}</TableCell>
                        <TableCell>{product.driven}</TableCell>
                        <TableCell>{FormatCurrency(product.priceInRupee)}</TableCell>
                        <TableCell>{FormatNumber(product.order)}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>       
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropDownItem
                                    id={ product.id }
                                    isAvailableForPurchase={ product.isAvailableForPurchase } />

                                    <DropdownMenuSeparator />
                                    
                                    <DeleteDropDownItem 
                                    id={ product.id } 
                                    disabled={ product._count.orders > 0 }/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

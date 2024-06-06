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
import { CheckCircle2, XCircle } from "lucide-react"

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
                    <TableHead>Manufacturing Date</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map( product => (
                    <TableRow key={product.id}>
                        <TableCell>
                            { product.isAvailableForPurchase ? (
                                <>
                                    <CheckCircle2 />
                                    <span className="sr-only">Available</span>
                                </>
                             ) : (
                                <>
                                    <XCircle />
                                    <span className="sr-only">Unavailable</span>
                                </>
                            )}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.model}</TableCell>
                        <TableCell>{product.owner}</TableCell>
                        <TableCell>{product.driven}</TableCell>
                        <TableCell>{product.priceInRupee}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

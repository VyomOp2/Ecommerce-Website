import { PageHeader } from "../_components/PageHeader"
import Link  from "next/link"
import { Table , TableBody , TableCell , TableHead , TableHeader , TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function AdminProductsPage() {
        return (
        <>
            <div className="flex justify-between items-center gap-4">
            <PageHeader>Products</PageHeader>
            <Button asChild>
                <Link href="/admin/products/new">Add New Product</Link>
            </Button>
            </div>
            <ProductTable />
        </>
        )
    }

function ProductTable () {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available For Purchase</span> 
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    )
}

import { Card , CardHeader , CardContent , CardDescription , CardTitle } from "@/components/ui/card"
import db from "@/db/db"
import { FormatCurrency, FormatNumber } from "@/lib/formatters"
import { Average } from "next/font/google"
import { resolve } from "path"

function wait(duration : number) {
    return new Promise(resolve => setTimeout(resolve , duration))
}


async function getSalesData() {
    const Sales_Data = await db.order.aggregate({
        _sum : { pricePaidInRupee : true},
        _count : true
    })

    await wait(1200)

    return {
        sales : ( Sales_Data._sum.pricePaidInRupee || 0 ) / 100,
        NumberOfSales : Sales_Data._count,
    }
}


async function getUserData() {
    const [UserCount , OrderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum : { pricePaidInRupee : true},
        }),
    ])

    return {
        UserCount,
        AverageValuePerUser:
            UserCount === 0 
                ? 0 : (OrderData._sum.pricePaidInRupee || 0 ) / UserCount / 100,
    }
}


async function getProductData() {
    const [ActiveCount , InActiveCount] = await Promise.all([
        db.product.count({ where: {isAvailableForPurchase : true}}),
        db.product.count({ where: {isAvailableForPurchase : false}}),
    ])

    return { ActiveCount , InActiveCount }
}


export default async function AdminDashboard() {
    
    const [Sales_Info , User_Info , ProductData ] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ])

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard 
        title="Sales" 
        subtitle={`${FormatNumber(
            Sales_Info.NumberOfSales
        )} Orders`} 
        body={FormatCurrency(Sales_Info.sales)}/>

        <DashboardCard 
        title="Customers" 
        subtitle={`${FormatCurrency(
            User_Info.AverageValuePerUser)
        } Average Value`} 
        body={FormatNumber(User_Info.UserCount)}/> 
        
        <DashboardCard 
        title="Active Products" 
        subtitle={`${FormatNumber(
            ProductData.InActiveCount
        )} Inactive`} 
        body={FormatNumber(ProductData.ActiveCount)}/>
    </div>
}


type DashboardCardProps = {
    title: string,
    subtitle: string,
    body: string
}


function DashboardCard ( {title , subtitle , body}:DashboardCardProps ) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    );
}

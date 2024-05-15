import { Card , CardHeader , CardContent , CardDescription , CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Sales" subtitle="Description" body="Test"/>
        <DashboardCard title="Accounts" subtitle="Description" body="Test2"/>
        <DashboardCard title="Marketing" subtitle="Description" body="Test3"/>
    </div>
}

function getSalesDate() {
    
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

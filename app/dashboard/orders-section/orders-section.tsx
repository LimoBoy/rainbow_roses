import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Orders from "@/app/dashboard/orders-section/orders/orders";
export function OrdersSection() {
    return (
        <Tabs defaultValue="orders" className="w-full">
            <TabsList className="p-5">
                <TabsTrigger value="orders">Your Orders</TabsTrigger>
                <TabsTrigger value="details">Account Details</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            <Orders/>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        You have 12 active projects and 3 pending tasks.
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="details">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Track performance and user engagement metrics. Monitor trends and
                            identify growth opportunities.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Page views are up 25% compared to last month.
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

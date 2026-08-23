import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "@/app/dashboard/sign-out-btn/sign-out-btn";
import {OrdersSection} from "@/app/dashboard/orders-section/orders-section";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <div className="mx-10">
                <div className="flex justify-between items-center mt-5">
                    <div>My account</div>
                    <div>
                        <SignOutButton/>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="relative w-full h-[200px] bg-cover bg-center p-10"
                         style={{
                             backgroundImage:
                                 "url('/images/dashboard/dashboard_bar.png')",
                         }}
                    >
                        <h2 className="mb-[15px] text-[24px] italic capitalize">{session!.user?.name}</h2>
                        <h1 className="text-[40px]">My Account</h1>
                    </div>
                </div>

                <div className="mt-5">
                    <OrdersSection/>
                </div>
            </div>
        </>
    );
}
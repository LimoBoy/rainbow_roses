"use client"
import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import {TeamSwitcher} from "@/app/(admin)/admin/components/team-switcher";
import {NavMain} from "@/app/(admin)/admin/components/nav-main";
import {NavProjects} from "@/app/(admin)/admin/components/nav-projects";
import {NavUser} from "@/app/(admin)/admin/components/nav-user";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Content",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Menu",
                    url: "/admin/categories",
                },
                {
                    title: "Pages",
                    url: "/admin/pages",
                },
                {
                    title: "Blog",
                    url: "/admin/blog",
                },
            ],
        },
        {
            title: "Products",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            {/*<SidebarHeader>*/}
            {/*    <TeamSwitcher teams={data.teams} />*/}
            {/*</SidebarHeader>*/}
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/*<NavProjects projects={data.projects} />*/}
            </SidebarContent>
            {/*<SidebarFooter>*/}
            {/*    <NavUser user={data.user} />*/}
            {/*</SidebarFooter>*/}
            <SidebarRail />
        </Sidebar>
    )
}
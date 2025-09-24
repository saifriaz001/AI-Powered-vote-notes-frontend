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
  MicVocal
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Kevin",
    email: "Kevin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "SpeakApp AI",
      logo: MicVocal,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title: "Voice Journal",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Record Journal",
          url: "/",
        }
      ],
    },
    {
      title: "Get All Voice Journal",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "My Voice Library",
          url: "/all-notes",
        }
      ],
    }
  ],

}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar 
    
    collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

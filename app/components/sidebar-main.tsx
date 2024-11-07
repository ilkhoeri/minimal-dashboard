"use client";

import * as React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import { NavBreadcrumb } from "./nav";
import { SearchInput } from "./search";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  IconWaveSine,
  IconDiscountCheck,
  IconBell,
  IconBook,
  IconRobot,
  IconChevronRight,
  IconSelector,
  IconCommand,
  IconCreditCard,
  IconFolder,
  IconKeyframe,
  IconDeviceNintendo,
  IconLifebuoy,
  IconLogout,
  IconMap,
  IconDots,
  IconChartPie,
  IconPlus,
  IconSend,
  IconSettings,
  IconSparkles,
  IconTrash,
  IconLayoutDashboard,
  IconArrowForwardUp,
  IconHome
} from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar";

export function SidebarMain({
  children,
  products,
  session,
  signOut
}: {
  children: React.ReactNode;
  session?: Session | null;
  products: { id: string; name: string }[] | null;
  signOut?: () => void;
}) {
  const [activeTeam, setActiveTeam] = React.useState(data(session).teams[0]);
  const pathname = usePathname();

  return (
    <SidebarRoot>
      <Sidebar collapsible="icon" className="[&_form]:min-w-8">
        <SidebarHeader>
          <SidebarMenu className="min-w-8">
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground min-w-8"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <activeTeam.logo className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {activeTeam.name}
                      </span>
                      <span className="truncate text-xs">
                        {activeTeam.plan}
                      </span>
                    </div>
                    <IconSelector className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Teams
                  </DropdownMenuLabel>
                  {data(session).teams.map((team, index) => (
                    <DropdownMenuItem
                      key={team.name}
                      onClick={() => setActiveTeam(team)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <team.logo className="size-4 shrink-0" />
                      </div>
                      {team.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <IconPlus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Add team
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>

          <SearchInput
            isSidebar
            className="h-8 w-full group-data-[state=collapsed]:placeholder:opacity-0 group-data-[state=collapsed]:[--space:0] group-data-[state=collapsed]:w-8"
          />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="z-[9] bg-sidebar">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <Link href="/">
                    <IconHome />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data(session).navMain.map((item) => {
                const isActive =
                  pathname === item.url ||
                  item.url
                    .split("/")
                    .filter(Boolean)
                    .includes(pathname.replace("/", ""));
                return (
                  <Collapsible key={item.title} asChild defaultOpen={isActive}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuItem className="[&_button>svg]:data-[state=open]:rotate-90">
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>

                        {item.items?.length ? (
                          <>
                            <SidebarMenuAction type="button">
                              <IconChevronRight className="transition-transform" />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>

                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items?.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link href={subItem.url}>
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </>
                        ) : null}
                      </SidebarMenuItem>
                    </CollapsibleTrigger>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data(session).projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <IconDots />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-48 rounded-lg [&_svg]:size-4 [&_svg]:mr-4"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <IconFolder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconArrowForwardUp className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <IconTrash className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <IconDots className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {data(session).navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="sm">
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      {session?.user.image && (
                        <AvatarImage
                          src={session.user.image}
                          alt={session?.user.name}
                        />
                      )}
                      <AvatarFallback className="rounded-lg">
                        {session?.user.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      {session?.user.name && (
                        <span className="truncate font-semibold">
                          {session.user.name}
                        </span>
                      )}
                      {session?.user.email && (
                        <span className="truncate text-xs">
                          {session.user.email}
                        </span>
                      )}
                    </div>
                    <IconSelector className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg [&_svg]:size-4 [&_svg]:mr-4"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        {session?.user.image && (
                          <AvatarImage
                            src={session.user.image}
                            alt={session?.user.name}
                          />
                        )}
                        <AvatarFallback className="rounded-lg">
                          {session?.user.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        {session?.user.name && (
                          <span className="truncate font-semibold">
                            {session.user.name}
                          </span>
                        )}
                        {session?.user.email && (
                          <span className="truncate text-xs">
                            {session.user.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconSparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={`/${session?.user.id}/settings`}>
                        <IconSettings />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/${session?.user.id}/settings`}>
                        <IconDiscountCheck />
                        Account
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <IconCreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconBell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={signOut}>
                    <IconLogout />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <NavBreadcrumb session={session} products={products} />
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarRoot>
  );
}

// This is sample data.
const data = (session: Session | null | undefined) => {
  return {
    teams: [
      {
        name: "Acme Inc",
        logo: IconDeviceNintendo,
        plan: "Enterprise"
      },
      {
        name: "Acme Corp.",
        logo: IconWaveSine,
        plan: "Startup"
      },
      {
        name: "Evil Corp.",
        logo: IconCommand,
        plan: "Free"
      }
    ],
    navMain: [
      {
        title: "Dashboard",
        url: `/dashboard/${session?.user.id}`,
        icon: IconLayoutDashboard,
        items: [
          {
            title: "History",
            url: "#history"
          },
          {
            title: "Analytics",
            url: "#analytics"
          },
          {
            title: "Products",
            url: "#products"
          },
          {
            title: "Settings",
            url: "#settings"
          }
        ]
      },
      {
        title: "Models",
        url: "#",
        icon: IconRobot,
        items: [
          {
            title: "Genesis",
            url: "#"
          },
          {
            title: "Explorer",
            url: "#"
          },
          {
            title: "Quantum",
            url: "#"
          }
        ]
      },
      {
        title: "Documentation",
        url: "#",
        icon: IconBook,
        items: [
          {
            title: "Introduction",
            url: "#"
          },
          {
            title: "Get Started",
            url: "#"
          },
          {
            title: "Tutorials",
            url: "#"
          },
          {
            title: "Changelog",
            url: "#"
          }
        ]
      },
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
        items: [
          {
            title: "General",
            url: "#"
          },
          {
            title: "Team",
            url: "#"
          },
          {
            title: "Billing",
            url: "#"
          },
          {
            title: "Limits",
            url: "#"
          }
        ]
      }
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: IconLifebuoy
      },
      {
        title: "Feedback",
        url: "#",
        icon: IconSend
      }
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: IconKeyframe
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: IconChartPie
      },
      {
        name: "Travel",
        url: "#",
        icon: IconMap
      }
    ]
  };
};

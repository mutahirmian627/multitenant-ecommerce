"use client";
import Link from "next/link";
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"]
});

interface NavBarItemsProps {
    children: ReactNode,
    isActive?: boolean,
    href: string,
};


export const NavbarItem = ({ children, isActive, href }: NavBarItemsProps) => {
    return (
        <Button
            asChild
            variant="outline"
            className={cn("bg-transparent hover:bg-transparent rounded-full border-transparent hover:border-primary px-3.5 text-lg", isActive && "bg-black text-white hover:bg-black hover:text-white")}>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
};

export const navbarItems = [
    { href: "/", children: "Home" },
    { href: "/about", children: "About" },
    { href: "/features", children: "Features" },
    { href: "/pricing", children: "Pricing" },
    { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions())

    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    Funroad
                </span>
            </Link>
            <NavbarSidebar items={navbarItems} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem key={item.href} href={item.href}
                        isActive={pathname === item.href}>
                        {item.children}
                    </NavbarItem>
                ))}
            </div>
            {session.data?.user ? (
                <div className="hidden lg:flex">
                    <Button className="h-full text-white bg-black px-12 border-l border-b-0 rounded-none border-r-0 border-t-0 hover:text-black hover:bg-pink-400">
                        <Link href="/admin">
                            Dashboard
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="hidden lg:flex">
                    <Button className="border-l border-t-0 border-r-0 border-b-0 text-black bg-white h-full px-12 transition-colors rounded-none hover:bg-pink-400 text-lg">
                        <Link prefetch href="/sign-in">
                            Log in
                        </Link>
                    </Button>
                    <Button className="h-full text-white bg-black px-12 border-l border-b-0 rounded-none border-r-0 border-t-0 hover:text-black hover:bg-pink-400">
                        <Link prefetch href="/sign-up">
                            Start Selling
                        </Link>
                    </Button>
                </div>
            )}
            <div className="flex lg:hidden items-center justify-center">
                <Button
                    onClick={() => setIsSidebarOpen(true)}
                    variant="ghost" className="border-transparent bg-white size-12">
                    <MenuIcon />
                </Button>
            </div>

        </nav>
    )
};


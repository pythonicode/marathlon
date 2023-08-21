"use client";

import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    const path = usePathname();
    const isActive = path === href;

    return <Link href={href} className={cn("hover:bg-slate-50 hidden md:block px-4 py-1 transition-colors font-semibold", isActive && "border-b-2 border-slate-900")}>
        {children}
    </Link >
}
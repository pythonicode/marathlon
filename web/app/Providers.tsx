"use client";

import { UnitsProvider } from "@/components/providers/units";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
        <UnitsProvider>
            {children}
        </UnitsProvider>
    </SessionProvider>
}
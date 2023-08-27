"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type UnitsContextType = {
    units: "imperial" | "metric" | null;
    toggleUnits: () => void;
};

const UnitsContext = createContext<UnitsContextType>({
    units: "metric",
    toggleUnits: () => { },
});

export function UnitsProvider({ children }: { children: React.ReactNode }) {
    const [units, setUnits] = useState<"imperial" | "metric" | null>(null);
    const session = useSession();

    useEffect(() => {
        // TODO: Get units from database
        setUnits("metric");
    }, [session]);

    const context = {
        units,
        toggleUnits: () => {
            // TODO: Update units in database
            setUnits(units === "imperial" ? "metric" : "imperial");
        },
    };

    return (
        <UnitsContext.Provider value={context}>{children}</UnitsContext.Provider>
    );
}

export function useUnits() {
    return useContext(UnitsContext);
}
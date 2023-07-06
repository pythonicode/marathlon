import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    session: null,
    user: null,
});

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }

    return context;
}

export function useAuthNoContext() {
    const [session, setSession] = useState<Session | null | undefined>(undefined);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, []);

    return { session, user: session?.user };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, []);

    return (
        <AuthContext.Provider value={{ session, user: session?.user }
        }>
            {children}
        </AuthContext.Provider>
    )
}
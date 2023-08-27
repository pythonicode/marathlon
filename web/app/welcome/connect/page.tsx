import { Button } from "@/components/ui/button";
import StravaButton from "./StravaButton";
import Link from "next/link";

export default function ConnectPage() {
    return <>
        <h1 className="text-center text-3xl lg:text-5xl font-bold mb-4">Quickstart</h1>
        <p className="text-center text-lg mb-4">Connect your Strava account to get started.</p>
        <StravaButton />
        <Link href="/welcome/sport" className="text-xl text-center w-full p-4 hover:text-neutral-700 transition-colors">I don&apos;t have Strava</Link>
    </>
}
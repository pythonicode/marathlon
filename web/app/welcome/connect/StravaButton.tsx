"use client";

import StravaLogo from "@/components/icons/StravaLogo";
import { Button } from "@/components/ui/button";

export default function StravaButton() {
    const connectToStrava = async () => {
    }

    return <Button onClick={connectToStrava} className="rounded text-center text-white text-xl w-full font-semibold p-8 mb-2 bg-orange-500 hover:bg-orange-500 hover:bg-orange-400">
        <StravaLogo size={24} className="mr-2" /> Connect to Strava
    </Button>
}
/* eslint-disable @next/next/no-img-element */
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import Link from "next/link";

export const metadata = {
    title: "Marathlon | Welcome",
    description: "After signing in, visit this page to begin the onboarding process.",
}

export default async function WelcomePage() {
    const session = await getServerSession();

    if (!session || !session.user) redirect("/signin");

    return <>
        {session.user.image && <img src={session.user.image} width={100} height={100} alt="Profile Picture" className="rounded-full mb-4" />}
        <h1 className="text-center text-3xl lg:text-5xl font-bold mb-4">Welcome!</h1>
        <p className="text-center text-lg mb-4">We&apos;re excited to have you! Let&apos;s get started.</p>
        <Link href="/welcome/connect" className="rounded text-center text-white text-xl w-full font-semibold p-4 bg-pink-500 hover:bg-pink-400 transition-colors">Get Started</Link>
    </>
}
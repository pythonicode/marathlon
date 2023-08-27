"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SignInForm() {
    return <form className="w-80 flex flex-col gap-4">
        <h1 className="text-center text-5xl font-bold mb-4">Marathlon</h1>
        <Button onClick={(e) => {
            e.preventDefault();
            signIn("google", { callbackUrl: "/welcome" })
        }} variant="outline" className="flex gap-4 text-md">
            <Image src="/images/google.png" width={20} height={20} alt="Google Logo" />
            Sign in with Google
        </Button>
        <Separator />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button className="text-md">Sign In</Button>
        <div className="flex justify-center gap-2">
            <span className="text-sm">Don&apos;t have an account?</span>
            <Link href="/signup" className="text-sm text-pink-500 hover:underline">Sign Up</Link>
        </div>
    </form >
}
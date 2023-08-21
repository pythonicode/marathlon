import Link from "next/link";
import NavLink from "./NavLink";

export default function Header() {
    return <header className="mx-auto max-w-6xl p-4 flex justify-between align-center">
        <Link href="/" className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl">Marathlon</Link>
        <nav className="flex gap-4 items-center">
            <NavLink href="/learn">Learn More</NavLink>
            <Link href="/signin" className="font-semibold bg-pink-600 text-white py-2 px-6 rounded hover:bg-pink-700 transition-colors">
                Get Started
            </Link>
        </nav>
    </header>
}
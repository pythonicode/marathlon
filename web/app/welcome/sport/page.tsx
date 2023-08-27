import Link from "next/link";

export default function SportPage() {
    return <>
        <h1 className="text-center text-3xl lg:text-5xl font-bold mb-4">Sport</h1>
        <p className="text-center text-lg mb-4">Please select your primary sport</p>
        <div className="flex flex-col gap-2 w-full">
            <Link className="text-xl text-center w-full p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors" href="/welcome/run">Running</Link>
            <Link className="text-xl text-center w-full p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors" href="/welcome/bike">Cycling</Link>
            <Link className="text-xl text-center w-full p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors" href="/welcome/triathlon">Triathlon</Link>
            <Link className="text-xl text-center w-full p-4 hover:text-neutral-700 transition-colors" href="/welcome/goals">None of the Above</Link>
        </div>
    </>
}
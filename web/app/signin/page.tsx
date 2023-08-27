import SignInForm from "./SignInForm";

export const metadata = {
    title: "Marathlon | Sign In",
    description: "Sign in to your account to access all the features of Marathlon.",
}

export default function SignInPage() {
    return <main className="grid grid-cols-1 lg:grid-cols-2">
        <section className="hidden lg:flex w-full h-screen bg-neutral-900 items-center justify-center">
            <h1 className="text-center text-6xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-700">ENDURANCE <br /> TRAINING <br /> REIMAGINED</h1>
        </section>
        <section className="flex items-center justify-center w-full h-screen">
            <SignInForm />
        </section>
    </main >
}
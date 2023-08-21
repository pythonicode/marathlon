import SignInForm from "./SignInForm";

export default function SignInPage() {
    return <main className="grid grid-cols-1 lg:grid-cols-2">
        <section className="hidden lg:block w-full h-screen bg-neutral-700">

        </section>
        <section className="flex items-center justify-center w-full h-screen">
            <SignInForm />
        </section>
    </main>
}
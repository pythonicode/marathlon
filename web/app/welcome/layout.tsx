export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    return <main className="h-screen bg-neutral-900 flex items-center justify-center">
        <section className="flex flex-col items-center bg-white p-8 md:p-10 lg:p-12 xl:p-16 rounded w-[30rem] max-w-screen-9/10">
            {children}
        </section>
    </main>
}

import Link from "next/link";
import RunForm from "./RunForm";

interface RunPageProps {
    searchParams: {
        step?: number;
    }
}

export default function RunPage({ searchParams: { step } }: RunPageProps) {
    return <RunForm step={step ?? 1} />
}
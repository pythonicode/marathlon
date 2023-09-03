import Link from "next/link";
import RunForm from "./RunForm";
import * as zod from "zod";

interface RunPageProps {
    searchParams: {
        step?: number;
    }
}

const schema = zod.object({
    training_goals: zod.array(zod.string()).nonempty(),
    training_days: zod.array(zod.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ])).min(3).max(7),
    training_volume: zod.coerce.number().min(0).max(1000000, { message: "Please input a valid amount" }),
    training_vert: zod.coerce.number().min(0).max(100000, { message: "Please input a valid amount" }).optional(),
    vdot: zod.coerce.number().min(0).max(100, { message: "VDOT must be between 0 and 100" }),
    prefers_track: zod.number().min(1).max(5),
    goal_race: zod.object({
        name: zod.string(),
        date: zod.date(),
        distance: zod.coerce.number().min(1, { message: "Please input a valid race distance" }).max(1000000, { message: "Please input a valid race distance" }),
        time: zod.number().min(1, { message: "Please input a valid time greater than 0" }).max(1000000, { message: "Please input a valid time" }),
        priority: zod.number().min(1).max(3)
    })
});

async function submit(formData: FormData) {
    "use server";

    const form = schema.parse(formData);
    console.log(form);
}

export default function RunPage({ searchParams: { step } }: RunPageProps) {
    return (
        <RunForm step={step ?? 1} onSubmit={submit} />
    )
}
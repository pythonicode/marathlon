"use client";

import { Button } from "@/components/ui/button";

import { zodResolver as resolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox";

import useFormPersist from 'react-hook-form-persist';
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { feetToMeters, kmToMeters, metersPerSecondToKilometerPace, metersPerSecondToMilePace, metersToFeet, metersToKm, metersToMiles, milesToMeters } from "@/lib/conversion";
import { useUnits } from "@/components/providers/units";
import { useTrainingZones } from "@/lib/run";
import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format, isValid } from "date-fns";

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


const goals = [
    {
        id: "fitness",
        label: "General Fitness",
    },
    {
        id: "track",
        label: "Track & Field",
    },
    {
        id: "xc",
        label: "Cross Country",
    },
    {
        id: "road",
        label: "Road Racing",
    },
    {
        id: "trail",
        label: "Trail Running",
    },
    {
        id: "orienteering",
        label: "Orienteering",
    }
] as const;

const days = [
    {
        id: "monday",
        label: "Monday",
    },
    {
        id: "tuesday",
        label: "Tuesday",
    },
    {
        id: "wednesday",
        label: "Wednesday",
    },
    {
        id: "thursday",
        label: "Thursday",
    },
    {
        id: "friday",
        label: "Friday",
    },
    {
        id: "saturday",
        label: "Saturday",
    },
    {
        id: "sunday",
        label: "Sunday",
    },
] as const;


export default function RunForm({ step, onSubmit }: { step: number, schema?: zod.ZodObject<zod.ZodRawShape>, onSubmit?: (formData: FormData) => void }) {
    const router = useRouter();
    const { units } = useUnits();

    const form = useForm<zod.infer<typeof schema>>({
        resolver: resolver(schema),
        defaultValues: {
            training_goals: ["fitness"],
            training_days: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
            ],
            training_volume: 10000,
            vdot: 40,
            prefers_track: 3,
            goal_race: {
                distance: 0,
                time: 0,
                priority: 2
            }
        },
    });

    useFormPersist("form", {
        watch: form.watch,
        setValue: form.setValue,
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
        exclude: ["goal_race.date"]
    });

    const zones = useTrainingZones(form.watch("vdot"));



    return <Form {...form}>
        <form action={onSubmit} className="w-full flex flex-col gap-4">
            {
                step === 1 && <>
                    <h1 className="text-center font-bold text-3xl lg:text-5xl">Goals</h1>
                    <p>I&apos;m training for...</p>
                    <FormField
                        control={form.control}
                        name="training_goals"
                        render={() => (
                            <div className="flex flex-col gap-2 w-full">
                                {goals.map((goal) => (
                                    <FormField
                                        key={goal.id}
                                        control={form.control}
                                        name="training_goals"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={goal.id}
                                                    className="flex flex-row items-center space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(goal.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, goal.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== goal.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-lg font-normal">
                                                        {goal.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />))}
                                <FormMessage />
                            </div>
                        )} />
                    <Button onClick={
                        async () => {
                            const valid = await form.trigger("training_goals");
                            if (valid) router.push("/welcome/run?step=2");
                        }
                    } variant="secondary" className="w-full text-xl p-8">Continue</Button>
                </>
            }
            {
                step == 2 && <>
                    <h1 className="text-center font-bold text-3xl lg:text-5xl">Schedule</h1>
                    <p>I&apos;m available to train on...</p>
                    <FormField
                        control={form.control}
                        name="training_days"
                        render={() => (
                            <div className="flex flex-col gap-2 w-full">
                                {days.map((goal) => (
                                    <FormField
                                        key={goal.id}
                                        control={form.control}
                                        name="training_days"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={goal.id}
                                                    className="flex flex-row items-center space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(goal.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, goal.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== goal.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-lg font-normal">
                                                        {goal.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />))}
                                <FormMessage />
                            </div>
                        )} />
                    <Button onClick={
                        async () => {
                            const valid = await form.trigger("training_days");
                            if (valid) router.push("/welcome/run?step=3");
                        }
                    } variant="secondary" className="w-full text-xl p-8">Continue</Button>
                </>
            }
            {
                step == 3 && <>
                    <h1 className="text-center font-bold text-3xl lg:text-5xl mb-4">Fitness</h1>
                    <FormField
                        control={form.control}
                        name="training_volume"
                        render={() => (
                            <FormItem>
                                <FormLabel>
                                    How much do you train per week?
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="40"
                                            value={units === "metric" ? Math.floor(metersToKm(form.watch("training_volume"))) : Math.floor(metersToMiles(form.watch("training_volume")))}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                if (Number.isNaN(value)) form.setValue("training_volume", 0);
                                                else if (units === "metric") form.setValue("training_volume", kmToMeters(value));
                                                else form.setValue("training_volume", milesToMeters(value));
                                            }}
                                            className="text-xl"
                                        />
                                        <div className="absolute inset-y-0 right-2 flex items-center">
                                            <UnitsToggle />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    If you&apos;re not sure, just give your best estimate.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        (form.watch("training_goals").includes("trail") || form.watch("training_goals").includes("orienteering")) &&
                        <FormField
                            control={form.control}
                            name="training_vert"
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        How much do you climb per week?
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="40"
                                                value={units === "metric" ? Math.floor(form.watch("training_vert") || 0) : Math.floor(metersToFeet(form.watch("training_vert") || 0))}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    if (Number.isNaN(value)) form.setValue("training_vert", 0);
                                                    else if (units === "metric") form.setValue("training_vert", value);
                                                    else form.setValue("training_vert", feetToMeters(value));

                                                }}
                                                className="text-xl"
                                            />
                                            <div className="absolute inset-y-0 right-2 flex items-center">
                                                <UnitsToggle smallUnits />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        If you&apos;re not sure, just give your best estimate.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                    <Button onClick={
                        async () => {
                            const result = await Promise.all([
                                form.trigger("training_volume"),
                                form.trigger("training_vert")
                            ]);
                            const valid = result.every((v) => v);
                            if (valid) router.push("/welcome/run?step=4");
                        }} variant="secondary" className="w-full text-xl p-8">Continue</Button>
                </>
            }
            {
                step == 4 && <>
                    <h1 className="text-center font-bold text-3xl lg:text-5xl mb-4">Paces</h1>
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-neutral-500">VDOT</div>
                        <div className="flex gap-2 text-5xl font-bold items-center mb-4">
                            <button
                                type="button"
                                onClick={() =>
                                    form.setValue("vdot", Math.max(form.getValues("vdot") - 1, 20))
                                }
                                title="Decrease VDOT"
                                className="rounded transition-colors hover:bg-neutral-100 p-2"
                            >
                                <ArrowLeft />
                            </button>
                            <span className="w-20 text-center">{form.watch("vdot")}</span>
                            <button
                                type="button"
                                onClick={() =>
                                    form.setValue("vdot", Math.min(form.getValues("vdot") + 1, 99))
                                }
                                title="Increase VDOT"
                                className="rounded transition-colors hover:bg-neutral-100 p-2"
                            >
                                <ArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex w-full flex-col gap-2 mb-4">
                            {Object.entries(zones).map(
                                ([zone, pace], index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between gap-2"
                                    >
                                        <div className="text-neutral-500">
                                            {zone}
                                            <span className="ml-2 text-black">
                                                {zone == "1"
                                                    ? "Recovery"
                                                    : zone == "2"
                                                        ? "Endurance"
                                                        : zone == "3"
                                                            ? "Tempo"
                                                            : zone == "4"
                                                                ? "Intervals"
                                                                : zone == "5"
                                                                    ? "VO2 Max"
                                                                    : "A problem has occurred."}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-xl font-bold w-12 text-center">
                                                {units == "metric"
                                                    ? metersPerSecondToKilometerPace(pace.start)
                                                    : metersPerSecondToMilePace(pace.start)}
                                            </div>
                                            <div>&rarr;</div>
                                            <div className="text-xl font-bold w-12 text-center">
                                                {units == "metric"
                                                    ? metersPerSecondToKilometerPace(pace.end)
                                                    : metersPerSecondToMilePace(pace.end)}
                                            </div>
                                            <div className="text-neutral-500">
                                                {units == "metric" ? "/km" : "/mi"}
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="text-sm text-neutral-500">
                            Note: <br /> Your normal running pace should be close to
                            Endurance and your fastest {
                                units == "metric" ? "5000m" : "5K"
                            } should close to
                            VO2 Max.
                        </div>
                    </div>
                    <Button onClick={
                        async () => {
                            const valid = await form.trigger("vdot");
                            if (valid) router.push("/welcome/run?step=5");
                        }} variant="secondary" className="w-full text-xl p-8">Continue</Button>
                </>
            }
            {
                step == 5 && <>
                    <h1 className="text-center font-bold text-3xl lg:text-5xl mb-4">Workouts</h1>
                    <FormField
                        control={form.control}
                        name="prefers_track"
                        render={() => (
                            <FormItem>
                                <FormLabel>
                                    Do you prefer doing workouts on the Track?
                                </FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-4 py-2">
                                        <Slider
                                            min={1}
                                            max={5}
                                            value={[form.watch("prefers_track")]}
                                            onValueChange={(value) => form.setValue("prefers_track", value[0])}
                                        />
                                        <div className="grid grid-cols-3">
                                            <div className="text-left">Never</div>
                                            <div className="text-center">Neutral</div>
                                            <div className="text-right">Always</div>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button onClick={
                        async () => {
                            const valid = await form.trigger("prefers_track");
                            if (valid) router.push("/welcome/run?step=6");
                        }} variant="secondary" className="w-full text-xl p-8">Continue</Button>

                </>
            }
            {
                step == 6 && <>
                    <h1 className="text-center font-bold text-3xl lg:text-5xl mb-4">Race</h1>
                    <p className="text-sm text-neutral-500">If you have a goal race that you are training for please fill out the following, you can always add more races later.    </p>
                    <FormField
                        control={form.control}
                        name="goal_race.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Western States 100" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="goal_race.date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value && isValid(field.value) ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() || date > new Date("2100-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="goal_race.distance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Race Distance
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="5"
                                            {...field}
                                        />
                                        <div className="absolute inset-y-0 right-2 flex items-center">
                                            <UnitsToggle />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="goal_race.time"
                        render={() => (
                            <FormItem>
                                <FormLabel>
                                    Goal Time
                                </FormLabel>
                                <FormControl>
                                    <div className="flex items-center justify-evenly gap-2">
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="HH"
                                            value={form.watch("goal_race.time") >= 3600 ? Math.floor(form.watch("goal_race.time") / 3600) : ""}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                if (Number.isNaN(value)) form.setValue("goal_race.time", form.getValues("goal_race.time") % 3600);
                                                else form.setValue("goal_race.time", form.getValues("goal_race.time") % 3600 + value * 3600);
                                            }}
                                        />
                                        <span>:</span>
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="MM"
                                            value={form.watch("goal_race.time") >= 60 ? `${Math.floor(form.watch("goal_race.time") / 60) % 60 < 10 ? "0" : ""}${Math.floor(form.watch("goal_race.time") / 60) % 60}` : ""}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                if (Number.isNaN(value)) form.setValue("goal_race.time", Math.floor(form.getValues("goal_race.time") / 3600) * 3600
                                                    + form.getValues("goal_race.time") % 60);
                                                else if (value >= 60) return;
                                                else form.setValue("goal_race.time", Math.floor(form.getValues("goal_race.time") / 3600) * 3600 + value * 60
                                                    + form.getValues("goal_race.time") % 60);
                                            }}
                                        />
                                        <span>:</span>
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="SS"
                                            value={form.watch("goal_race.time") % 60 < 10 ? `0${form.watch("goal_race.time") % 60}` : form.watch("goal_race.time") % 60}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                if (Number.isNaN(value)) form.setValue("goal_race.time", Math.floor(form.getValues("goal_race.time") / 3600) * 3600
                                                    + Math.floor(form.getValues("goal_race.time") % 3600 / 60) * 60);
                                                else if (value >= 60) return;
                                                else form.setValue("goal_race.time", Math.floor(form.getValues("goal_race.time") / 3600) * 3600
                                                    + Math.floor(form.getValues("goal_race.time") % 3600 / 60) * 60 + value);
                                            }}
                                        />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="goal_race.priority"
                        render={() => (
                            <FormItem>
                                <FormLabel>
                                    Priority
                                </FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-4 py-2">
                                        <Slider
                                            min={1}
                                            max={3}
                                            value={[form.watch("goal_race.priority")]}
                                            onValueChange={(value) => form.setValue("goal_race.priority", value[0])}
                                        />
                                        <div className="flex justify-between">
                                            <div className="text-left">Low</div>
                                            <div className="text-right">High</div>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit"
                        variant="secondary" className="w-full text-xl p-8">Finish</Button>
                </>
            }
        </form>
    </Form >
}

function UnitsToggle({ smallUnits }: { smallUnits?: boolean }) {
    const { units, toggleUnits } = useUnits();

    if (!units) return null;

    return (
        <button type="button" onClick={toggleUnits} className="flex flex-row gap-1">
            <div
                className={`flex h-8 w-8 items-center justify-center rounded transition-colors hover:text-black ${units == "imperial" ? "bg-neutral-200 text-black" : "text-neutral-500"
                    }`}
            >
                {smallUnits ? "ft" : "mi"}
            </div>
            <div
                className={`flex h-8 w-8 items-center justify-center rounded transition-colors hover:text-black ${units == "metric" ? "bg-neutral-200 text-black" : "text-neutral-500"
                    }`}
            >
                {smallUnits ? "m" : "km"}
            </div>
        </button>
    );
}
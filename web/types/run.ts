export enum TrainingZone {
    recovery = 1,
    aerobic = 2,
    threshold = 3,
    cv = 4,
    vo2 = 5,
}

export type TrainingZones = {
    [key in TrainingZone]: { start: number; end: number };
};

export type TrainingEvent = {
    id: string;
    date: string;
    training: Training;
}

export type Training = {
    name: string;
    description: string;
    type: TrainingType;
    elements: TrainingElement[];
    plan?: TrainingPlan;
    units?: TrainingUnits;
    time_based?: boolean;
}

type TrainingType = "recovery" | "base" | "workout" | "track" | "long";
type TrainingUnits = "metric" | "imperial" | "any";
type TrainingPlan = "any" | "5km" | "marathon" | "trail" | "orienteering" | "ultra";

type TrainingElement = {
    name?: string;
    description?: string;
    reps?: number;
    duration?: number;
    distance?: number;
    zone?: TrainingZone;
    elements?: TrainingElement[];
}
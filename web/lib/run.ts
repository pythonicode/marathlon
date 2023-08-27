import { Training, TrainingZones } from "@/types/run";
import { useEffect, useState } from "react";

// Calculates and returns VDOT given distance and climb in meters and time in seconds.
export function calculateVDOT(
    dist: number,
    time: number,
    climb: number = 0
): number {
    const distance = dist + climb * 4; // climb adjusted
    const tweak =
        0.8 +
        0.1894393 * Math.exp((-0.012778 * time) / 60) +
        0.2989558 * Math.exp((-0.1932605 * time) / 60);
    const vdot =
        (-4.6 +
            0.182258 * ((distance / time) * 60) +
            0.000104 * Math.pow((distance / time) * 60, 2)) /
        tweak;
    return Math.floor(vdot);
}

// Calculate an returns training zones given a VDOT in m/s.
export function calculateTrainingZones(vdot: number): TrainingZones {
    const marathonTime = 39174.3 - 1056.3 * vdot + 12.8028 * Math.pow(vdot, 2) - 0.0562392 * Math.pow(vdot, 3);
    const pace = marathonTime / 26.21875;
    const zones = {
        1: {
            start: calculateZone(0.5, vdot, pace),
            end: calculateZone(0.59, vdot, pace),
        },
        2: {
            start: calculateZone(0.63, vdot, pace),
            end: calculateZone(0.67, vdot, pace),
        },
        3: {
            start: calculateZone(0.85, vdot, pace),
            end: calculateZone(0.87, vdot, pace),
        },
        4: {
            start: calculateZone(0.92, vdot, pace),
            end: calculateZone(0.95, vdot, pace),
        },
        5: {
            start: calculateZone(0.987, vdot, pace),
            end: calculateZone(1.01, vdot, pace),
        },
    };
    return zones;
}

export function useTrainingZones(vdot: number) {
    const [zones, setZones] = useState<TrainingZones>(calculateTrainingZones(vdot));
    useEffect(() => {
        setZones(calculateTrainingZones(vdot));
    }, [vdot]);
    return zones;
}

// Returns pace in seconds / mile given a heart rate target and marathon pace.
function calculateZone(hr: number, vdot: number, marathonpace: number): number {
    const marathonhr = 0.822;
    const adjustment =
        (marathonpace -
            1609.344 /
            (29.54 +
                5.000663 * (vdot * marathonhr) -
                0.007546 * Math.pow(vdot * marathonhr, 2))) /
        (1609.344 /
            (29.54 +
                5.000663 * (vdot * marathonhr) -
                0.007546 * Math.pow(vdot * marathonhr, 2)));
    const pace =
        (1609.344 /
            (29.54 + 5.000663 * (vdot * hr) - 0.007546 * Math.pow(vdot * hr, 2))) *
        (1 + adjustment);
    return 1609 / pace;
}

export function calculateTrainingDistance(training: Training, vdot: number = 40): number {
    const trainingZones = calculateTrainingZones(vdot);

    return training.elements.reduce((distance, element) => {
        if (element.distance) return distance + (element.reps ?? 1) * element.distance;
        else if (element.duration) return distance + (element.reps ?? 1) * element.duration * (trainingZones[element.zone ?? 1].start + trainingZones[element.zone ?? 1].end) / 2;
        else if (element.elements) return distance + (element.reps ?? 1) * calculateTrainingDistance({ name: "", description: "", type: training.type, elements: element.elements });
        return distance;
    }, 0);
}

export function calculateTrainingDuration(training: Training, vdot: number = 40): number {
    const trainingZones = calculateTrainingZones(vdot);

    return training.elements.reduce((time, element) => {
        if (element.distance) return time + (element.reps ?? 1) * element.distance / trainingZones[element.zone ?? 1].start;
        else if (element.duration) return time + (element.reps ?? 1) * element.duration;
        else if (element.elements) return time + (element.reps ?? 1) * calculateTrainingDuration({ name: "", description: "", type: training.type, elements: element.elements });
        return time;
    }, 0);
}
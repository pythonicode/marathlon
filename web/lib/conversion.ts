export function metersToKm(meters: number): number {
    return meters / 1000;
}

export function kmToMeters(km: number): number {
    return km * 1000;
}

export function metersToMiles(meters: number): number {
    return meters / 1609.344;
}

export function milesToMeters(miles: number): number {
    return miles * 1609.344;
}

export function metersToFeet(meters: number): number {
    return meters * 3.28084;
}

export function feetToMeters(feet: number): number {
    return feet / 3.28084;
}

export function metersPerSecondToMilePace(mps: number): string {
    const minPerMile = 26.8224 / mps;
    return `${Math.floor(minPerMile)}:${Math.floor((minPerMile % 1) * 60) < 10 ? "0" : ""
        }${Math.floor((minPerMile % 1) * 60)}`;
}

export function metersPerSecondToKilometerPace(mps: number): string {
    const minPerKm = 16.6667 / mps;
    return `${Math.floor(minPerKm)}:${Math.floor((minPerKm % 1) * 60) < 10 ? "0" : ""
        }${Math.floor((minPerKm % 1) * 60)}`;
}
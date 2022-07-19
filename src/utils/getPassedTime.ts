
export enum TimeUnit {
    Second = "seconds",
    Minute = "minutes",
    Hour = "hours",
    Day = "days",
    Week = "weeks",
    Month = "months",
    Year = "years",
}

export class TimePassed {
    constructor(public readonly time: number, public readonly unit: TimeUnit) { }

    toString(): string {
        return `${Math.floor(this.time)} ${this.unit.toString()}`;
    }
}

export function getTimePassed(ref: Date, now: Date = new Date()): TimePassed {
    const nowMs = now.getTime();
    const refMs = ref.getTime();
    const ms = nowMs - refMs;

    // Seconds
    const seconds = ms / 1000;
    if (seconds < 60) {
        return new TimePassed(seconds, TimeUnit.Second);
    }

    // Minutes
    const minutes = seconds / 60;

    if (minutes < 60) {
        return new TimePassed(minutes, TimeUnit.Minute);
    }

    // Hours
    const hours = minutes / 60;

    if (hours < 60) {
        return new TimePassed(hours, TimeUnit.Hour);
    }

    // Days
    const days = hours / 24;

    if (days < 7) {
        return new TimePassed(days, TimeUnit.Day);
    }

    // Weeks
    const weeks = days / 7;

    if (weeks < 4) {
        return new TimePassed(weeks, TimeUnit.Week);
    }

    // Months
    const months = weeks / 4;

    if (months < 12) {
        return new TimePassed(months, TimeUnit.Month);
    }

    // Years
    const years = months / 12;
    return new TimePassed(years, TimeUnit.Year);
}
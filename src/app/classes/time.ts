export class Time {
    constructor(
        public hours: string,
        public minutes: string,
        public dayPeriod: 'AM' | 'PM'
    ) {}

    static isValidHours(hours: string): boolean {
        return Number(hours) >= 1 && Number(hours) <= 12;
    }

    static isValidMinutes(minutes: string): boolean {
        return  Number(minutes) >= 0 && Number(minutes) <= 59;
    }

    static isLessThan(timeA: Time, timeB: Time): boolean {
        return timeA.timeToMinutes() < timeB.timeToMinutes();
    }

    timeToMinutes(): number {
        let h = Number(this.hours);
        let m = Number(this.minutes);
        if (this.dayPeriod == 'AM') {
            return h * 60 + m
        } else {
            return h*60 + 12 * 60 + m;
        }


    }
}


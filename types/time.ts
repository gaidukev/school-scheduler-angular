export class Time {
    constructor(
        public hours: string,
        public minutes: string,
        public dayPeriod: 'AM' | 'PM'
    ) {}

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


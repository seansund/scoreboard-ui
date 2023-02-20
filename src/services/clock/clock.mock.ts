import {BehaviorSubject, EMPTY, map, Observable, ObservableInput, of, switchMap, timer} from "rxjs";

import {ClockApi} from "./clock.api";
import {asPrettyTime, ClockModel, createInitialClock} from "../../models";

enum ClockControl {
    START = 'START',
    STOP = 'STOP',
    RESET = 'RESET',
    UPDATE = 'UPDATE',
}

export class ClockMock implements ClockApi {
    subject: BehaviorSubject<ClockModel>
    currentClock: ClockModel

    controls: BehaviorSubject<ClockControl>
    started: boolean = true

    constructor() {
        this.currentClock = createInitialClock(8, 1)
        this.subject = new BehaviorSubject<ClockModel>(this.currentClock)
        this.controls = new BehaviorSubject<ClockControl>(ClockControl.STOP)

        const timerObs = timer(0, 1000)
            .pipe(
                map(() => {
                    const currentClock = this.currentClock

                    this.currentClock = (currentClock.time > 0)
                        ? {time: currentClock.time - 1, period: currentClock.period, running: this.currentClock.running}
                        : (currentClock.period < 4)
                            ? createInitialClock(8, currentClock.period + 1)
                            : currentClock

                    return this.currentClock
                })
            )

        this.controls.pipe(switchMap((control: ClockControl): ObservableInput<ClockModel> => {
            switch(control) {
                case ClockControl.START:
                    this.started = true
                    return timerObs

                    break
                case ClockControl.STOP:
                    this.started = false
                    return EMPTY

                    break
                case ClockControl.RESET:
                    this.currentClock = createInitialClock(8, this.currentClock.period)

                    if (this.started) {
                        return timerObs
                    } else {
                        return EMPTY
                    }

                    break
                case ClockControl.UPDATE:
                    if (this.started) {
                        return timerObs
                    } else {
                        return of(this.currentClock)
                    }

                    break
                default:
                    if (this.started) {
                        console.log('timer')
                        return timerObs
                    } else {
                        return EMPTY
                    }
            }
        }))
            .subscribe(this.subject)

        this.controls.next(ClockControl.START)
    }

    async get(): Promise<ClockModel> {
        return this.subject.getValue()
    }

    clockObservable(): Observable<ClockModel> {
        return this.subject;
    }

    async periodAdd(): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {period:  Math.min(4, this.currentClock.period + 1)})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }

    async periodSet(period: number): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {period})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }

    async periodSubtract(): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {period: Math.max(1, this.currentClock.period - 1)})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }

    async reset(): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {time: 8 * 60})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }

    async start(): Promise<ClockModel> {
        this.controls.next(ClockControl.START)

        return this.currentClock
    }

    async stop(): Promise<ClockModel> {
        this.controls.next(ClockControl.STOP)

        return this.currentClock
    }

    async timeMinuteAdd(): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {time: this.currentClock.time + 60})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }

    async timeMinuteSubtract(): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {time: Math.max(0, this.currentClock.time - 60)})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }

    async timeSecondAdd(): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {time: this.currentClock.time + 1})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }

    async timeSecondSubtract(): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {time: Math.max(0, this.currentClock.time - 1)})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }

    async timeSet(minute: number, second: number): Promise<ClockModel> {
        this.currentClock = Object.assign({}, this.currentClock, {time: minute + 60 + second})
        this.controls.next(ClockControl.UPDATE)

        return this.currentClock
    }
}

import {Observable} from "rxjs";

import {ClockModel} from "../../models";

export abstract class ClockApi {
    abstract get(): Promise<ClockModel>
    abstract subscribe(): Observable<ClockModel>
    abstract periodAdd(): Promise<ClockModel>
    abstract periodSubtract(): Promise<ClockModel>
    abstract periodSet(period: number): Promise<ClockModel>
    abstract start(): Promise<ClockModel>
    abstract stop(): Promise<ClockModel>
    abstract reset(): Promise<ClockModel>
    abstract timeMinuteAdd(): Promise<ClockModel>
    abstract timeMinuteSubtract(): Promise<ClockModel>
    abstract timeSecondAdd(): Promise<ClockModel>
    abstract timeSecondSubtract(): Promise<ClockModel>
    abstract timeSet(minute: number, second: number): Promise<ClockModel>
}

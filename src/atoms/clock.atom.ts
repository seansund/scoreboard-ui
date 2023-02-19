import {atom} from "jotai";
import {atomWithObservable, loadable} from "jotai/utils";
import {Container} from "typescript-ioc";

import {ClockApi} from "../services";
import {asPrettyTime, ClockModel, MinutesSecondsModel, parseMinutesSeconds} from "../models";

const service: ClockApi = Container.get(ClockApi)

export const clockAtom = atomWithObservable<ClockModel>(() => service.subscribe())

export enum UpdatePeriodAction {
    ADD_PERIOD = 'ADD_PERIOD',
    SUBTRACT_PERIOD = 'SUBTRACT_PERIOD'
}

export const periodAtom = atom(
    async get => {
        const currentClock: ClockModel = await get(clockAtom)

        return currentClock.period
    },
    async (_get, _set, update: UpdatePeriodAction | string) => {
        switch (update) {
            case UpdatePeriodAction.ADD_PERIOD:
                await service.periodAdd()
                break
            case UpdatePeriodAction.SUBTRACT_PERIOD:
                await service.periodSubtract()
                break
            default:
                const newPeriod = Number(update)
                await service.periodSet(newPeriod)
                break
        }
    }
)

export const periodAtomLoadable = loadable(periodAtom)

const splitTimeString = (timeString: string): {minutes: number, seconds: number} | undefined => {
    const regex = new RegExp('([0-9]+)m ?([0-9])+s')

    const result = regex.exec(timeString)
    if (!result || result.length < 3) {
        return
    }

    return {minutes: Number(result[1]), seconds: Number(result[2])}
}

export enum UpdateClockAction {
    ADD_MINUTE = 'ADD_MINUTE',
    SUBTRACT_MINUTE = 'SUBTRACT_MINUTE',
    ADD_SECOND = 'ADD_SECOND',
    SUBTRACT_SECOND = 'SUBTRACT_SECOND',
    START = 'START',
    STOP = 'STOP'
}

export const timerAtom = atom(
    async get => {
        const currentClock: ClockModel = await get(clockAtom)

        return asPrettyTime(currentClock.time)
    },
    async (get, _set, update: UpdateClockAction | string) => {
        switch (update) {
            case UpdateClockAction.ADD_MINUTE:
                await service.timeMinuteAdd()
                break
            case UpdateClockAction.SUBTRACT_MINUTE:
                await service.timeMinuteSubtract()
                break
            case UpdateClockAction.ADD_SECOND:
                await service.timeSecondAdd()
                break
            case UpdateClockAction.SUBTRACT_SECOND:
                await service.timeSecondSubtract()
                break
            case UpdateClockAction.START:
                await service.start()
                break
            case UpdateClockAction.STOP:
                await service.stop()
                break
            default:
                const result: MinutesSecondsModel | undefined = splitTimeString(update)

                if (result) {
                    await service.timeSet(result.minutes, result.seconds)
                }
                break
        }
    }
)

export const timerAtomLoadable = loadable(timerAtom)

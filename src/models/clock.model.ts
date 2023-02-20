
export interface ClockModel {
    time: number
    period: number
    running: boolean
}

export interface MinutesSecondsModel {
    minutes: number
    seconds: number
}

export const formatNumber = (value: number, digits: number): string => {
    let result = String(value)

    while (result.length < digits) {
        result = '0' + result
    }

    return result
}

export const asPrettyTime = (time: number): string => {
    const {minutes, seconds} = parseMinutesSeconds(time)

    return `${minutes}:${formatNumber(seconds, 2)}`
}

export const parseMinutesSeconds = (time: number): MinutesSecondsModel => {
    const minutes = (time / 60) & 0xFFFF
    const seconds = time - (minutes * 60)

    return {minutes, seconds}
}

export const combineMinutesSeconds = (value: MinutesSecondsModel): number => {
    return value.minutes * 60 + value.seconds
}

export const createInitialClock = (minutes: number = 8, period: number = 1): ClockModel => ({
    time: 60 * minutes,
    period,
    running: false
})

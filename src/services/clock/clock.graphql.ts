import {BehaviorSubject, Observable} from "rxjs";
import {ApolloClient, FetchResult, gql} from "@apollo/client";

import {ClockApi} from "./clock.api";
import {getApolloClient} from "../../backends";
import {ClockModel} from "../../models";

const GET_GAME_CLOCK_QUERY = gql`query { getGameClock { time period running } }`;

const GAME_CLOCK_SUBSCRIPTION = gql`subscription { gameClock { time period running } }`

const PERIOD_ADD_MUTATE = gql`
    mutation PeriodAdd {
        periodAdd {
            time
            period
            running
        }
    }
`

const PERIOD_SUBTRACT_MUTATE = gql`
    mutation PeriodSubtract {
        periodSubtract {
            time
            period
            running
        }
    }
`

const PERIOD_SET_MUTATE = gql`
    mutation SetPeriod($period: Int!) {
        periodSet(period: $period) {
            time
            period
            running
        }
    }
`

const CLOCK_START_MUTATE = gql`
    mutation {
        startClock {
            time
            period
            running
        }
    }
`

const CLOCK_STOP_MUTATE = gql`
    mutation {
        stopClock {
            time
            period
            running
        }
    }
`

const CLOCK_RESET_MUTATE = gql`
    mutation {
        resetClock {
            time
            period
            running
        }
    }
`

const CLOCK_ADD_MINUTE_MUTATE = gql`
    mutation {
        timeMinuteAdd {
            time
            period
            running
        }
    }
`

const CLOCK_SUBTRACT_MINUTE_MUTATE = gql`
    mutation {
        timeMinuteSubtract {
            time
            period
            running
        }
    }
`

const CLOCK_ADD_SECOND_MUTATE = gql`
    mutation {
        timeSecondAdd {
            time
            period
            running
        }
    }
`

const CLOCK_SUBTRACT_SECOND_MUTATE = gql`
    mutation {
        timeSecondSubtract {
            time
            period
            running
        }
    }
`

const CLOCK_SET_MUTATE = gql`
    mutation SetTime($minute: Int!, $second: Int!) {
        timeSet(minute: $minute, second: $second) {
            time
            period
            running
        }
    }
`

export class ClockGraphql implements ClockApi {
    client: ApolloClient<any>

    subject: BehaviorSubject<ClockModel>

    constructor() {
        this.client = getApolloClient();

        this.subject = new BehaviorSubject<ClockModel>({
            time: 8*60,
            period: 1,
            running: false
        })
    }

    clockObservable(skipQuery: boolean = false): Observable<ClockModel> {
        if (skipQuery) {
            return this.subject
        }

        this.client
            .subscribe<{gameClock: ClockModel}>({
                query: GAME_CLOCK_SUBSCRIPTION
            })
            .map((config: FetchResult<{gameClock: ClockModel}>) => config.data?.gameClock)
            .subscribe({
                next: (val: ClockModel) => {
                    this.subject.next(val)
                },
                complete: () => {
                    console.log('Complete subscription!!!!')
                },
                error: err => {
                    console.log('Error with subscription', err)
                    this.subject.error(err)
                }
            })

        return this.subject;
    }

    get(): Promise<ClockModel> {
        return this.client
            .query<{getGameClock: ClockModel}>({query: GET_GAME_CLOCK_QUERY})
            .then(result => result.data.getGameClock)
    }

    periodAdd(): Promise<ClockModel> {
        return this.client
            .mutate<{periodAdd: ClockModel}>({
                mutation: PERIOD_ADD_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{periodAdd: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.periodAdd

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    periodSubtract(): Promise<ClockModel> {
        return this.client
            .mutate<{periodSubtract: ClockModel}>({
                mutation: PERIOD_SUBTRACT_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{periodSubtract: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.periodSubtract

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    periodSet(period: number): Promise<ClockModel> {
        return this.client
            .mutate<{periodSet: ClockModel}>({
                mutation: PERIOD_SET_MUTATE,
                variables: {period}
            })
            .then<ClockModel>((result: FetchResult<{periodSet: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.periodSet

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    reset(): Promise<ClockModel> {
        return this.client
            .mutate<{resetClock: ClockModel}>({
                mutation: CLOCK_RESET_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{resetClock: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.resetClock

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    start(): Promise<ClockModel> {
        return this.client
            .mutate<{startClock: ClockModel}>({
                mutation: CLOCK_START_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{startClock: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.startClock

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    stop(): Promise<ClockModel> {
        return this.client
            .mutate<{stopClock: ClockModel}>({
                mutation: CLOCK_STOP_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{stopClock: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.stopClock

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    timeMinuteAdd(): Promise<ClockModel> {
        return this.client
            .mutate<{timeMinuteAdd: ClockModel}>({
                mutation: CLOCK_ADD_MINUTE_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{timeMinuteAdd: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.timeMinuteAdd

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    timeMinuteSubtract(): Promise<ClockModel> {
        return this.client
            .mutate<{timeMinuteSubtract: ClockModel}>({
                mutation: CLOCK_SUBTRACT_MINUTE_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{timeMinuteSubtract: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.timeMinuteSubtract

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    timeSecondAdd(): Promise<ClockModel> {
        return this.client
            .mutate<{timeSecondAdd: ClockModel}>({
                mutation: CLOCK_ADD_SECOND_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{timeSecondAdd: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.timeSecondAdd

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    timeSecondSubtract(): Promise<ClockModel> {
        return this.client
            .mutate<{timeSecondSubtract: ClockModel}>({
                mutation: CLOCK_SUBTRACT_SECOND_MUTATE,
                variables: {}
            })
            .then<ClockModel>((result: FetchResult<{timeSecondSubtract: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.timeSecondSubtract

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    timeSet(minute: number, second: number): Promise<ClockModel> {
        return this.client
            .mutate<{timeSet: ClockModel}>({
                mutation: CLOCK_SET_MUTATE,
                variables: {minute, second}
            })
            .then<ClockModel>((result: FetchResult<{timeSet: ClockModel}>) => {
                if (result.data) {
                    const clock = result.data.timeSet

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

}
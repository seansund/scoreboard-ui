import {BehaviorSubject, Observable} from "rxjs";
import {ApolloClient, FetchResult, gql} from "@apollo/client";

import {ScoresApi} from "./scores.api";
import {getApolloClient} from "../../backends";
import {ClockModel, ScoresModel, TeamIdentifier} from "../../models";

const GET_CURRENT_SCORE_QUERY = gql`query { getCurrentScore { home { score fouls } away { score fouls } } }`;

const GAME_SCORE_SUBSCRIPTION = gql`subscription { gameScore { home { score fouls } away { score fouls } } }`

const ADD_FOUL_MUTATE = gql`
    mutation AddFoul($team: String!) {
        addFoul(team: $team) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

const SUBTRACT_FOUL_MUTATE = gql`
    mutation SubtractFoul($team: String!) {
        subtractFoul(team: $team) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

const ADD_SCORE_MUTATE = gql`
    mutation AddScore($team: String!) {
        addScore(team: $team) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

const ADD_SCORE_TWO_MUTATE = gql`
    mutation AddScoreTwo($team: String!) {
        addScoreTwo(team: $team) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

const ADD_SCORE_THREE_MUTATE = gql`
    mutation AddScoreThree($team: String!) {
        addScoreThree(team: $team) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

const SUBTRACT_SCORE_MUTATE = gql`
    mutation SubtractScore($team: String!) {
        subtractScore(team: $team) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

const SUBTRACT_SCORE_TWO_MUTATE = gql`
    mutation SubtractScoreTwo($team: String!) {
        subtractScoreTwo(team: $team) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

const SUBTRACT_SCORE_THREE_MUTATE = gql`
    mutation SubtractScoreThree($team: String!) {
        subtractScoreThree(team: $team) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

const SET_SCORE_MUTATE = gql`
    mutation SetScore($team: String!, $score: Int!) {
        setScore(team: $team, score: $score) {
            home {
                score
                fouls
            }
            away {
                score
                fouls
            }
        }
    }
`

export class ScoresGraphql implements ScoresApi {
    client: ApolloClient<any>

    subject: BehaviorSubject<ScoresModel>

    constructor() {
        this.client = getApolloClient();

        this.subject = new BehaviorSubject<ScoresModel>({
            home: {
                score: 0,
                fouls: 0
            },
            away: {
                score: 0,
                fouls: 0
            }
        })
    }

    get(): Promise<ScoresModel> {
        return this.client
            .query<{getCurrentScore: ScoresModel}>({query: GET_CURRENT_SCORE_QUERY})
            .then(result => result.data.getCurrentScore)
    }

    scoreObservable(skipQuery: boolean = false): Observable<ScoresModel> {
        if (skipQuery) {
            return this.subject
        }

        this.client
            .subscribe<{gameScore: ScoresModel}>({
                query: GAME_SCORE_SUBSCRIPTION
            })
            .map((config: FetchResult<{gameScore: ScoresModel}>) => config.data?.gameScore)
            .subscribe({
                next: (val: ScoresModel) => {
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

        return this.subject
    }

    addFoul(team: TeamIdentifier): Promise<ScoresModel> {
        return this.client
            .mutate<{addFoul: ScoresModel}>({
                mutation: ADD_FOUL_MUTATE,
                variables: {team}
            })
            .then<ScoresModel>((result: FetchResult<{addFoul: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.addFoul

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    addScore(team: TeamIdentifier): Promise<ScoresModel> {
        return this.client
            .mutate<{addScore: ScoresModel}>({
                mutation: ADD_SCORE_MUTATE,
                variables: {team}
            })
            .then<ScoresModel>((result: FetchResult<{addScore: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.addScore

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    addScoreThree(team: TeamIdentifier): Promise<ScoresModel> {
        return this.client
            .mutate<{addScoreThree: ScoresModel}>({
                mutation: ADD_SCORE_THREE_MUTATE,
                variables: {team}
            })
            .then<ScoresModel>((result: FetchResult<{addScoreThree: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.addScoreThree

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    addScoreTwo(team: TeamIdentifier): Promise<ScoresModel> {
        return this.client
            .mutate<{addScoreTwo: ScoresModel}>({
                mutation: ADD_SCORE_TWO_MUTATE,
                variables: {team}
            })
            .then<ScoresModel>((result: FetchResult<{addScoreTwo: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.addScoreTwo

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    setScore(team: TeamIdentifier, score: number): Promise<ScoresModel> {
        return this.client
            .mutate<{setScore: ScoresModel}>({
                mutation: SET_SCORE_MUTATE,
                variables: {team, score}
            })
            .then<ScoresModel>((result: FetchResult<{setScore: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.setScore

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    subtractFoul(team: TeamIdentifier): Promise<ScoresModel> {
        return this.client
            .mutate<{subtractFoul: ScoresModel}>({
                mutation: SUBTRACT_FOUL_MUTATE,
                variables: {team}
            })
            .then<ScoresModel>((result: FetchResult<{subtractFoul: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.subtractFoul

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    subtractScore(team: TeamIdentifier): Promise<ScoresModel> {
        return this.client
            .mutate<{subtractScore: ScoresModel}>({
                mutation: SUBTRACT_SCORE_MUTATE,
                variables: {team}
            })
            .then<ScoresModel>((result: FetchResult<{subtractScore: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.subtractScore

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    subtractScoreThree(team: TeamIdentifier): Promise<ScoresModel> {
        return this.client
            .mutate<{subtractScoreThree: ScoresModel}>({
                mutation: SUBTRACT_SCORE_THREE_MUTATE,
                variables: {team}
            })
            .then<ScoresModel>((result: FetchResult<{subtractScoreThree: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.subtractScoreThree

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

    subtractScoreTwo(team: TeamIdentifier): Promise<ScoresModel> {
        return this.client
            .mutate<{subtractScoreTwo: ScoresModel}>({
                mutation: SUBTRACT_SCORE_TWO_MUTATE,
                variables: {team}
            })
            .then<ScoresModel>((result: FetchResult<{subtractScoreTwo: ScoresModel}>) => {
                if (result.data) {
                    const clock = result.data.subtractScoreTwo

                    this.subject.next(clock)

                    return clock;
                }
                return this.subject.getValue()
            })
    }

}
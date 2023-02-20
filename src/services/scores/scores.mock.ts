import {BehaviorSubject, map, Observable, timer} from "rxjs";

import {ScoresApi} from "./scores.api";
import {createEmptyTeamScore, ScoresModel, TeamIdentifier, TeamScoreModel, toggleTeamIdentifier} from "../../models";

const updateFoul = (teamScore: TeamScoreModel, value: number): TeamScoreModel => {
    return Object.assign({}, teamScore, {fouls: teamScore.fouls + value})
}
const updateScore = (teamScore: TeamScoreModel, value: number): TeamScoreModel => {
    return Object.assign({}, teamScore, {score: teamScore.score + value})
}
const setScore = (teamScore: TeamScoreModel, value: number): TeamScoreModel => {
    return Object.assign({}, teamScore, {score: value})
}

export class ScoresMock implements ScoresApi {
    subject: BehaviorSubject<ScoresModel>

    constructor() {
        this.subject = new BehaviorSubject({
            home: createEmptyTeamScore(),
            away: createEmptyTeamScore()
        })

        // const currentTeam: {team: TeamIdentifier} = {team: TeamIdentifier.home}
        //
        // timer(5000, 7500)
        //     .subscribe({
        //         next: async () => {
        //             await this.addScoreTwo(currentTeam.team)
        //
        //             currentTeam.team = toggleTeamIdentifier(currentTeam.team)
        //         }
        //     })
    }

    async get(): Promise<ScoresModel> {
        return this.subject.getValue();
    }

    scoreObservable(): Observable<ScoresModel> {
        return this.subject;
    }

    async addFoul(team: TeamIdentifier): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? updateFoul(currentScore.home, 1) : currentScore.home,
            away: (team === TeamIdentifier.away) ? updateFoul(currentScore.away, 1) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

    async addScore(team: TeamIdentifier): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? updateScore(currentScore.home, 1) : currentScore.home,
            away: (team === TeamIdentifier.away) ? updateScore(currentScore.away, 1) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

    async subtractFoul(team: TeamIdentifier): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? updateFoul(currentScore.home, -1) : currentScore.home,
            away: (team === TeamIdentifier.away) ? updateFoul(currentScore.away, -1) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

    async subtractScore(team: TeamIdentifier): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? updateScore(currentScore.home, -1) : currentScore.home,
            away: (team === TeamIdentifier.away) ? updateScore(currentScore.away, -1) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

    async setScore(team: TeamIdentifier, score: number): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? setScore(currentScore.home, score) : currentScore.home,
            away: (team === TeamIdentifier.away) ? setScore(currentScore.away, score) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

    async addScoreThree(team: TeamIdentifier): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? updateScore(currentScore.home, 3) : currentScore.home,
            away: (team === TeamIdentifier.away) ? updateScore(currentScore.away, 3) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

    async addScoreTwo(team: TeamIdentifier): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? updateScore(currentScore.home, 2) : currentScore.home,
            away: (team === TeamIdentifier.away) ? updateScore(currentScore.away, 2) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

    async subtractScoreThree(team: TeamIdentifier): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? updateScore(currentScore.home, -3) : currentScore.home,
            away: (team === TeamIdentifier.away) ? updateScore(currentScore.away, -3) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

    async subtractScoreTwo(team: TeamIdentifier): Promise<ScoresModel> {
        const currentScore = this.subject.getValue()

        const newScore: ScoresModel = {
            home: (team === TeamIdentifier.home) ? updateScore(currentScore.home, -2) : currentScore.home,
            away: (team === TeamIdentifier.away) ? updateScore(currentScore.away, -2) : currentScore.away,
        }

        this.subject.next(newScore)

        return this.subject.getValue()
    }

}
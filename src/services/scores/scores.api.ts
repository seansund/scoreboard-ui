import {Observable} from "rxjs";

import {ScoresModel, TeamIdentifier, TeamModel} from "../../models";

export abstract class TeamScoreApi {
    abstract addScore(): Promise<ScoresModel>
    abstract addScoreTwo(): Promise<ScoresModel>
    abstract addScoreThree(): Promise<ScoresModel>
    abstract subtractScore(): Promise<ScoresModel>
    abstract subtractScoreTwo(): Promise<ScoresModel>
    abstract subtractScoreThree(): Promise<ScoresModel>
    abstract setScore(score: number): Promise<ScoresModel>
    abstract addFoul(): Promise<ScoresModel>
    abstract subtractFoul(): Promise<ScoresModel>
}

export abstract class ScoresApi {
    abstract get(): Promise<ScoresModel>
    abstract subscribe(): Observable<ScoresModel>
    abstract addScore(team: TeamIdentifier): Promise<ScoresModel>
    abstract addScoreTwo(team: TeamIdentifier): Promise<ScoresModel>
    abstract addScoreThree(team: TeamIdentifier): Promise<ScoresModel>
    abstract subtractScore(team: TeamIdentifier): Promise<ScoresModel>
    abstract subtractScoreTwo(team: TeamIdentifier): Promise<ScoresModel>
    abstract subtractScoreThree(team: TeamIdentifier): Promise<ScoresModel>
    abstract addFoul(team: TeamIdentifier): Promise<ScoresModel>
    abstract subtractFoul(team: TeamIdentifier): Promise<ScoresModel>
    abstract setScore(team: TeamIdentifier, score: number): Promise<ScoresModel>
}

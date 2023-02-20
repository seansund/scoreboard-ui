import {Observable} from "rxjs";

import {ScoresModel, TeamIdentifier, TeamModel} from "../../models";

export abstract class ScoresApi {
    abstract get(): Promise<ScoresModel>
    abstract scoreObservable(skipQuery?: boolean): Observable<ScoresModel>
    abstract addScore(team: TeamIdentifier): Promise<ScoresModel>
    abstract addScoreTwo(team: TeamIdentifier): Promise<ScoresModel>
    abstract addScoreThree(teama: TeamIdentifier): Promise<ScoresModel>
    abstract subtractScore(team: TeamIdentifier): Promise<ScoresModel>
    abstract subtractScoreTwo(team: TeamIdentifier): Promise<ScoresModel>
    abstract subtractScoreThree(team: TeamIdentifier): Promise<ScoresModel>
    abstract addFoul(team: TeamIdentifier): Promise<ScoresModel>
    abstract subtractFoul(team: TeamIdentifier): Promise<ScoresModel>
    abstract setScore(team: TeamIdentifier, score: number): Promise<ScoresModel>
}

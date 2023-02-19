
export interface ScoresModel {
    home: TeamScoreModel
    away: TeamScoreModel
}

export interface TeamScoreModel {
    score: number
    fouls: number
}

export const createEmptyTeamScore = () => ({score: 0, fouls: 0})

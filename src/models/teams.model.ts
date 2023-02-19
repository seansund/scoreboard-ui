
export interface TeamsModel {
    home: TeamModel
    away: TeamModel
}

export interface TeamModel {
    name: string
    color: string
    logoUrl?: string
}

export enum TeamIdentifier {
    home = 'home',
    away = 'away'
}

export const toggleTeamIdentifier = (value: TeamIdentifier): TeamIdentifier => {
    return value === TeamIdentifier.home ? TeamIdentifier.away : TeamIdentifier.home
}

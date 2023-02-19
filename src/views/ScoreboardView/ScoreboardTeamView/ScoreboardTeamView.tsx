import {TeamModel, TeamScoreModel} from "../../../models";

export interface ScoreboardTeamViewProps {
    team: TeamModel
    score: TeamScoreModel
}

export const ScoreboardTeamView = (props: ScoreboardTeamViewProps) => {
    const team = props.team
    const score = props.score

    return (
        <div>
            <div>
                <span>{ team.logoUrl ? (<img ref={team.logoUrl} />) : '' }</span><span>{team.name}</span><span>{score.score}</span>
            </div>
            <div>Fouls: {score.fouls}</div>
    </div>)
}

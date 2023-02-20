import {useAtomValue, useSetAtom} from "jotai";
import {Grid, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';

import './ScoreboardTeamView.css';
import {scoreAtom, UpdatePeriodAction, UpdateScoreAction} from "../../../atoms";
import {TeamIdentifier, TeamModel, TeamScoreModel} from "../../../models";
import {getScoreFromLoadable, getTeamFromLoadable, Loadable} from "../../../util";

export interface ScoreboardTeamViewProps {
    teamLoadable: any
    scoreLoadable: any
    teamId: TeamIdentifier
    alignment: 'left' | 'right'
}

export const ScoreboardTeamView = (props: ScoreboardTeamViewProps) => {
    const teamLoadable = useAtomValue(props.teamLoadable) as Loadable<TeamModel>
    const scoreLoadable = useAtomValue(props.scoreLoadable) as Loadable<TeamScoreModel>
    const updateScore = useSetAtom(scoreAtom)

    const update = async (action: UpdateScoreAction) => {
        const prefix = props.teamId === TeamIdentifier.home ? 'HOME_' : 'AWAY_'

        updateScore(prefix + action).catch((err: any) => console.log('Error updating score: ', err))
    }

    const team: TeamModel = getTeamFromLoadable(teamLoadable, props.teamId)
    const score: TeamScoreModel = getScoreFromLoadable(scoreLoadable)

    /*
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    <Grid item xs={6}><Button variant="contained" onClick={() => update(UpdateScoreAction.ADD_FOUL)}>+</Button></Grid>
                    <Grid item xs={6}><Button variant="contained" onClick={() => update(UpdateScoreAction.SUBTRACT_FOUL)}>-</Button></Grid>
                </Grid>
            </Grid>
        </Grid>

     */
    return (<Grid container>
        <Grid item xs={12} spacing={2}><div className="teamControl">{team.name}</div></Grid>
        <Grid item xs={12} spacing={2}><div className="scoreControl">{score.score}</div></Grid>
        <Grid item xs={12} spacing={2}><div className="foulsControlLabel">Fouls</div></Grid>
        <Grid item xs={4}>
            <IconButton aria-label="subtract-foul" size="small" onClick={() => update(UpdateScoreAction.SUBTRACT_FOUL)}>
                <SubtractIcon />
            </IconButton>
        </Grid>
        <Grid item xs={4} spacing={2}><div className="foulsControl">{score.fouls}</div></Grid>
        <Grid item xs={4}>
            <IconButton aria-label="add-foul" size="small" onClick={() => update(UpdateScoreAction.ADD_FOUL)}>
                <AddIcon />
            </IconButton>
        </Grid>
    </Grid>)
}

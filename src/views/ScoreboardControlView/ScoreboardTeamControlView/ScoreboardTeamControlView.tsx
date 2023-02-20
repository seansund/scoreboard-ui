import React from "react";
import {useAtomValue, useSetAtom} from "jotai";
import {Button, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';

import {scoreAtom, UpdateScoreAction} from "../../../atoms";
import {TeamIdentifier, TeamModel, TeamScoreModel} from "../../../models";
import {getScoreFromLoadable, getTeamFromLoadable, Loadable} from "../../../util";

export interface ScoreboardTeamControlViewProps {
    teamLoadable: any
    scoreLoadable: any
    teamId: TeamIdentifier
    alignment: 'left' | 'right'
}

export const ScoreboardTeamControlView = (props: ScoreboardTeamControlViewProps) => {
    const teamLoadable = useAtomValue(props.teamLoadable) as Loadable<TeamModel>
    const scoreLoadable = useAtomValue(props.scoreLoadable) as Loadable<TeamScoreModel>
    const updateScore = useSetAtom(scoreAtom)

    const update = async (action: UpdateScoreAction) => {
        const prefix = props.teamId === TeamIdentifier.home ? 'HOME_' : 'AWAY_'

        updateScore(prefix + action)
            .catch(err => console.log('Error updating score: ', err))
    }

    return (<div>
        <Grid container spacing={2}>
            <Grid item xs={12}><Button className="scoreButton" variant="outlined" startIcon={<AddIcon />} onClick={() => update(UpdateScoreAction.ADD_SCORE)}>1</Button></Grid>
            <Grid item xs={12}><Button className="scoreButton" variant="outlined" startIcon={<SubtractIcon />} onClick={() => update(UpdateScoreAction.SUBTRACT_SCORE)}>1</Button></Grid>
            <Grid item xs={12}><Button className="scoreButton" variant="outlined" startIcon={<AddIcon />} onClick={() => update(UpdateScoreAction.ADD_SCORE_TWO)}>2</Button></Grid>
            <Grid item xs={12}><Button className="scoreButton" variant="outlined" startIcon={<AddIcon />} onClick={() => update(UpdateScoreAction.ADD_SCORE_THREE)}>3</Button></Grid>
        </Grid>
    </div>)
}

import React from "react";
import {Grid} from "@mui/material";

import {TeamModel, TeamScoreModel} from "../../../models";

export interface ScoreboardTeamViewProps {
    team: TeamModel
    score: TeamScoreModel
}

export const ScoreboardTeamView = (props: ScoreboardTeamViewProps) => {
    const team = props.team
    const score = props.score

    return (
        <Grid container>
            <Grid item xs={2}>
                <div style={{backgroundColor: team.color, width: '100%'}}>{ team.logoUrl ? (<img ref={team.logoUrl} alt="logo" />) : '\u00A0' }</div>
            </Grid>
            <Grid item xs={8}>
                <div style={{width: '100%', textAlign: 'left'}}>{team.name}</div>
            </Grid>
            <Grid item xs={2}>
                <div style={{width: '100%', textAlign: 'right'}}>{score.score}</div>
            </Grid>
            <Grid item xs={2}>&nbsp;</Grid>
            <Grid item xs={10}><div style={{width: '100%', textAlign: 'left'}}>Fouls: {score.fouls}</div></Grid>
    </Grid>)
}

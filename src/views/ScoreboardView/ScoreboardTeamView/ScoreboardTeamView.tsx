import React from "react";
import {Grid} from "@mui/material";

import './ScoreboardTeamView.css';
import {TeamIdentifier, TeamModel, TeamScoreModel} from "../../../models";

export interface ScoreboardTeamViewProps {
    team: TeamModel
    score: TeamScoreModel
    teamId: TeamIdentifier
}

export const ScoreboardTeamView = (props: ScoreboardTeamViewProps) => {
    const team = props.team
    const score = props.score

    const backgroundColor = TeamIdentifier.away ? team.color : 'white'
    const color = TeamIdentifier.away ? 'white' : 'black'

    return (
        <div style={{backgroundColor}}>
        <Grid container>
            <Grid item xs={2}>
                <div className="logoColor">{ team.logoUrl ? (<img ref={team.logoUrl} alt="logo" />) : '\u00A0' }</div>
            </Grid>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={10}>
                        <div style={{color}} className="scoreboard teamLabel">{team.name}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{color}} className="scoreboard scoreLabel">{score.score}</div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="scoreboard foulLabel">Fouls: {score.fouls}</div>
                    </Grid>
                </Grid>
            </Grid>
    </Grid>
        </div>)
}

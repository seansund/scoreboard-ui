import React from "react";
import {useAtomValue} from "jotai";
import {Box, Grid} from "@mui/material";

import {ScoreboardClockView} from "./ScoreboardClockView";
import {ScoreboardTeamView} from "./ScoreboardTeamView";
import {
    awayScoreAtom,
    awayTeamAtomLoadable,
    homeScoreAtom,
    homeTeamAtomLoadable,
    periodAtom,
    timerAtom
} from "../../atoms";
import {TeamIdentifier, TeamModel, TeamScoreModel} from "../../models";
import {getTeamFromLoadable} from "../../util";

export interface ScoreboardViewProps {
}

export const ScoreboardView = (props: ScoreboardViewProps) => {
    const homeTeam: TeamModel = getTeamFromLoadable(useAtomValue(homeTeamAtomLoadable), TeamIdentifier.home)
    const homeScore: TeamScoreModel = useAtomValue(homeScoreAtom)

    const awayTeam: TeamModel = getTeamFromLoadable(useAtomValue(awayTeamAtomLoadable), TeamIdentifier.home)
    const awayScore: TeamScoreModel = useAtomValue(awayScoreAtom)

    return (<Grid container spacing={2} style={{paddingRight: '5px'}}>
            <Grid item xs={6}>&nbsp;</Grid>
            <Grid item xs={6}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <ScoreboardTeamView team={awayTeam} score={awayScore} />
                </Grid>
                <Grid item xs={5}>
                    <ScoreboardTeamView team={homeTeam} score={homeScore} />
                </Grid>
                <Grid item xs={2}>
                    <ScoreboardClockView />
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}

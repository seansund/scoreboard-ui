import {Box, Grid} from "@mui/material";
import React from "react";
import {useAtomValue} from "jotai"

import {ScoreboardTeamControlView} from "./ScoreboardTeamControlView";
import {
    awayScoreAtom,
    awayScoreAtomLoadable,
    awayTeamAtomLoadable,
    homeScoreAtom, homeScoreAtomLoadable,
    homeTeamAtomLoadable
} from "../../atoms";
import {TeamIdentifier, TeamModel, TeamScoreModel} from "../../models";
import {getTeamFromLoadable} from "../../util";
import {ScoreboardClockControlView} from "./ScoreboardClockControlView";
import {ScoreboardTeamView} from "./ScoreboardTeamView";
import {ScoreboardClockView} from "./ScoreboardClockView";

export interface ScoreboardControlViewProps {
}

export const ScoreboardControlView = (props: ScoreboardControlViewProps) => {

    return (<Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ScoreboardTeamView teamLoadable={awayTeamAtomLoadable} scoreLoadable={awayScoreAtomLoadable} teamId={TeamIdentifier.away} alignment="left" />
                </Grid>
                <Grid item xs={4}>
                    <ScoreboardClockView />
                </Grid>
                <Grid item xs={4}>
                    <ScoreboardTeamView teamLoadable={homeTeamAtomLoadable} scoreLoadable={homeScoreAtomLoadable} teamId={TeamIdentifier.home} alignment="right" />
                </Grid>
                <Grid item xs={4}>
                    <ScoreboardTeamControlView teamLoadable={awayTeamAtomLoadable} scoreLoadable={awayScoreAtomLoadable} teamId={TeamIdentifier.away} alignment="left" />
                </Grid>
                <Grid item xs={4}>
                    <ScoreboardClockControlView />
                </Grid>
                <Grid item xs={4}>
                    <ScoreboardTeamControlView teamLoadable={homeTeamAtomLoadable} scoreLoadable={homeScoreAtomLoadable} teamId={TeamIdentifier.home} alignment="right" />
                </Grid>
            </Grid>
        </Box>
    )
}

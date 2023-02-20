import React from "react";
import {Button, Grid} from "@mui/material";
import {useAtomValue, useSetAtom} from "jotai";

import './ScoreboardClockControlView.css';
import {
    periodAtomLoadable,
    runningTimerAtomLoadable,
    timerAtom,
    timerAtomLoadable,
    UpdateClockAction
} from "../../../atoms";

export interface ScoreboardClockControlViewProps {
}

export const ScoreboardClockControlView = (props: ScoreboardClockControlViewProps) => {
    const timerLoadable = useAtomValue(timerAtomLoadable)
    const updateTimer = useSetAtom(timerAtom)

    const runningTimerLoadable = useAtomValue(runningTimerAtomLoadable)

    const periodLoadable = useAtomValue(periodAtomLoadable)

    if (timerLoadable.state === 'loading') {
        return (<div>Loading...</div>)
    } else if (timerLoadable.state === 'hasError') {
        return (<div>Error</div>)
    }

    if (runningTimerLoadable.state === 'loading') {
        return (<div>Loading...</div>)
    } else if (runningTimerLoadable.state === 'hasError') {
        return (<div>Error</div>)
    }

    if (periodLoadable.state === 'loading') {
        return (<div>Loading...</div>)
    } else if (periodLoadable.state === 'hasError') {
        return (<div>Error</div>)
    }

    const running: boolean = runningTimerLoadable.data

    return (<Grid container spacing={2}>
        <Grid item xs={6}>
            <Button className="clockButton" variant="contained" color="error" onClick={() => updateTimer(UpdateClockAction.RESET)}>Reset</Button>
        </Grid>
        <Grid item xs={6}>
            <Button className="clockButton" variant="contained" color={running ? "secondary" : "primary"} onClick={() => updateTimer(running ? UpdateClockAction.STOP : UpdateClockAction.START)}>{running ? "Stop" : "Start"}</Button>
        </Grid>
        <Grid item xs={6}>
            <Button className="clockButton" variant="contained" onClick={() => updateTimer(UpdateClockAction.ADD_MINUTE)}>+1 m</Button>
        </Grid>
        <Grid item xs={6}>
            <Button className="clockButton" variant="contained" onClick={() => updateTimer(UpdateClockAction.ADD_SECOND)}>+1 s</Button>
        </Grid>
        <Grid item xs={6}>
            <Button className="clockButton" variant="contained" onClick={() => updateTimer(UpdateClockAction.SUBTRACT_MINUTE)}>-1 m</Button>
        </Grid>
        <Grid item xs={6}>
            <Button className="clockButton" variant="contained" onClick={() => updateTimer(UpdateClockAction.SUBTRACT_SECOND)}>-1 s</Button>
        </Grid>
    </Grid>)
}

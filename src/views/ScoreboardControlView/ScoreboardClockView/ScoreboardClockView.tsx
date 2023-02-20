import {useAtomValue, useSetAtom} from "jotai";
import {Button, Grid, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SubtractIcon from '@mui/icons-material/Remove';

import './ScoreboardClockView.css'
import {periodAtom, periodAtomLoadable, timerAtomLoadable, UpdatePeriodAction} from "../../../atoms";

export interface ScoreboardClockViewProps {
}

export const ScoreboardClockView = (props: ScoreboardClockViewProps) => {
    const timerLoadable = useAtomValue(timerAtomLoadable)

    const periodLoadable = useAtomValue(periodAtomLoadable)
    const updatePeriod = useSetAtom(periodAtom)

    if (timerLoadable.state === 'loading') {
        return (<div>Loading...</div>)
    } else if (timerLoadable.state === 'hasError') {
        return (<div>Error</div>)
    }

    if (periodLoadable.state === 'loading') {
        return (<div>Loading...</div>)
    } else if (periodLoadable.state === 'hasError') {
        return (<div>Error</div>)
    }

    return (<Grid container>
        <Grid item xs={12}><div className="clockControl">{timerLoadable.data}</div></Grid>
        <Grid item xs={12}><div className="periodControlLabel">Period</div></Grid>
        <Grid item xs={4}>
            <IconButton aria-label="subtract" size="small" onClick={() => updatePeriod(UpdatePeriodAction.SUBTRACT_PERIOD)}>
                <SubtractIcon />
            </IconButton>
        </Grid>
        <Grid item xs={4}>
            <div className="periodControl">{periodLoadable.data}</div>
        </Grid>
        <Grid item xs={4}>
            <IconButton aria-label="add" size="small" onClick={() => updatePeriod(UpdatePeriodAction.ADD_PERIOD)}>
                <AddIcon />
            </IconButton>
        </Grid>
    </Grid>)
}

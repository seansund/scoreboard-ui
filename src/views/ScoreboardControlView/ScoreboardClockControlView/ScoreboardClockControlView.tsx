import {useAtomValue, useSetAtom} from "jotai";
import {
    periodAtom,
    periodAtomLoadable,
    timerAtom,
    timerAtomLoadable,
    UpdateClockAction,
    UpdatePeriodAction
} from "../../../atoms";
import {Button} from "@mui/material";

export interface ScoreboardClockControlViewProps {
}

export const ScoreboardClockControlView = (props: ScoreboardClockControlViewProps) => {
    const timerLoadable = useAtomValue(timerAtomLoadable)
    const updateTimer = useSetAtom(timerAtom)

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

    return (<div>
        <div className="clock">{timerLoadable.data}</div>
        <div>
            <Button variant="contained" onClick={() => updateTimer(UpdateClockAction.START)}>Start</Button>
            <Button variant="contained" onClick={() => updateTimer(UpdateClockAction.STOP)}>Stop</Button>
        </div>
        <div>
            <Button variant="contained" onClick={() => updateTimer(UpdateClockAction.ADD_MINUTE)}>+1m</Button>
            <Button variant="contained" onClick={() => updateTimer(UpdateClockAction.ADD_SECOND)}>+1s</Button>
        </div>
        <div>
            <Button variant="contained" onClick={() => updateTimer(UpdateClockAction.SUBTRACT_MINUTE)}>-1m</Button>
            <Button variant="contained" onClick={() => updateTimer(UpdateClockAction.SUBTRACT_SECOND)}>-1s</Button>
        </div>
        <div>
            <Button variant="contained" onClick={() => updatePeriod(UpdatePeriodAction.SUBTRACT_PERIOD)}>-</Button>
            <span>{periodLoadable.data}</span>
            <Button variant="contained" onClick={() => updatePeriod(UpdatePeriodAction.ADD_PERIOD)}>+</Button>
        </div>
    </div>)
}

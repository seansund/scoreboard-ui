import {useAtomValue} from "jotai";

import './ScoreboardClockView.css'
import {periodAtom, timerAtom} from "../../../atoms";

export interface ScoreboardClockViewProps {
}

export const ScoreboardClockView = (props: ScoreboardClockViewProps) => {
    const clock = useAtomValue(timerAtom)
    const period = useAtomValue(periodAtom)

    return (<div>
        <div className="clock">{clock}</div>
        <div className="period">{period}</div>
    </div>)
}

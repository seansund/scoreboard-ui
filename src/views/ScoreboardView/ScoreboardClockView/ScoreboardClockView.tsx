import {useAtomValue} from "jotai";

import './ScoreboardClockView.css'
import {homeTeamAtomLoadable, periodAtom, teamAtomLoadable, timerAtom} from "../../../atoms";
import {Grid} from "@mui/material";
import {TeamIdentifier, TeamModel, TeamsModel} from "../../../models";
import {getTeamFromLoadable} from "../../../util";

export interface ScoreboardClockViewProps {
}

export const ScoreboardClockView = (props: ScoreboardClockViewProps) => {
    const teams = useAtomValue(teamAtomLoadable)

    const clock: string = useAtomValue(timerAtom)
    const period: number = useAtomValue(periodAtom)

    const asOrdinal = (period: number): string => {
        let ordinal;
        switch (period) {
            case 1:
                ordinal = 'st'
                break
            case 2:
                ordinal = 'nd'
                break
            case 3:
                ordinal = 'rd'
                break
            default:
                ordinal = 'th'
                break
        }
        return period + ordinal;
    }

    let title = ''
    if (teams.state === 'hasData') {
        title = teams.data.title
    }

    return (<Grid container>
        <Grid item xs={6}><div className="period">{asOrdinal(period)}</div></Grid>
        <Grid item xs={6}><div className="clock">{clock}</div></Grid>
        <Grid item xs={12}><div className="title">{title}</div></Grid>
    </Grid>)
}

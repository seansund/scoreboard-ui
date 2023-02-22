import {Loadable} from "./loadable";
import {TeamIdentifier, TeamModel} from "../models";

export const getTeamFromLoadable = (value: Loadable<TeamModel>, teamId: TeamIdentifier): TeamModel => {
    const defaultColor = teamId === TeamIdentifier.home ? 'white' : 'black'

    if (value.state === 'loading') {
        return {name: 'Loading...', color: defaultColor}
    } else if (value.state === 'hasError') {
        return {name: 'Unknown', color: defaultColor}
    } else {
        return value.data
    }
}

import {Loadable} from "./loadable";
import {TeamScoreModel} from "../models";

export const getScoreFromLoadable = (value: Loadable<TeamScoreModel>): TeamScoreModel => {
    if (value.state === 'loading' || value.state === 'hasError') {
        return {score: 0, fouls: 0}
    } else {
        return value.data
    }
}

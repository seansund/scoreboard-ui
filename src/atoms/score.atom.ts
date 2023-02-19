import {atom} from "jotai";
import {atomWithObservable, loadable} from "jotai/utils";
import {Container} from "typescript-ioc";

import {ScoresApi} from "../services";
import {ScoresModel, TeamIdentifier} from "../models";

export enum UpdateScoreAction {
    ADD_SCORE = 'ADD_SCORE',
    ADD_SCORE_TWO = 'ADD_SCORE_TWO',
    ADD_SCORE_THREE = 'ADD_SCORE_THREE',
    SUBTRACT_SCORE = 'SUBTRACT_SCORE',
    SUBTRACT_SCORE_TWO = 'SUBTRACT_SCORE_TWO',
    SUBTRACT_SCORE_THREE = 'SUBTRACT_SCORE_THREE',
    ADD_FOUL = 'ADD_FOUL',
    SUBTRACT_FOUL = 'SUBTRACT_FOUL'
}

const lookupAction = (value: string): UpdateScoreAction => {
    switch (value) {
        case UpdateScoreAction.ADD_SCORE:
            return UpdateScoreAction.ADD_SCORE
        case UpdateScoreAction.ADD_SCORE_TWO:
            return UpdateScoreAction.ADD_SCORE_TWO
        case UpdateScoreAction.ADD_SCORE_THREE:
            return UpdateScoreAction.ADD_SCORE_THREE
        case UpdateScoreAction.SUBTRACT_SCORE:
            return UpdateScoreAction.SUBTRACT_SCORE
        case UpdateScoreAction.SUBTRACT_SCORE_TWO:
            return UpdateScoreAction.SUBTRACT_SCORE_TWO
        case UpdateScoreAction.SUBTRACT_SCORE_THREE:
            return UpdateScoreAction.SUBTRACT_SCORE_THREE
        case UpdateScoreAction.ADD_FOUL:
            return UpdateScoreAction.ADD_FOUL
        case UpdateScoreAction.SUBTRACT_FOUL:
            return UpdateScoreAction.SUBTRACT_FOUL
        default:
            throw new Error('UpdateScoreAction not found: ' + value)
    }
}

const service: ScoresApi = Container.get(ScoresApi)

const updateScore = async (team: TeamIdentifier, update: UpdateScoreAction | string): Promise<ScoresModel> => {
    switch (update) {
        case UpdateScoreAction.ADD_SCORE:
            return service.addScore(team)
        case UpdateScoreAction.ADD_SCORE_TWO:
            return service.addScoreTwo(team)
        case UpdateScoreAction.ADD_SCORE_THREE:
            return service.addScoreThree(team)
        case UpdateScoreAction.SUBTRACT_SCORE:
            return service.subtractScore(team)
        case UpdateScoreAction.SUBTRACT_SCORE_TWO:
            return service.subtractScoreTwo(team)
        case UpdateScoreAction.SUBTRACT_SCORE_THREE:
            return service.subtractScoreThree(team)
        case UpdateScoreAction.ADD_FOUL:
            return service.addFoul(team)
        case UpdateScoreAction.SUBTRACT_FOUL:
            return service.subtractFoul(team)
        default:
            const newScore = Number(update)
            return service.setScore(team, newScore)
    }
}

const baseAtom = atomWithObservable<ScoresModel>(() => service.subscribe())

export const scoreAtom = atom(
    async get => await get(baseAtom),
    async (_get, _set, update: string) => {
        const teamId: TeamIdentifier = update.startsWith('HOME_') ? TeamIdentifier.home : TeamIdentifier.away
        const action: UpdateScoreAction = lookupAction(update.replace(/HOME_/, '').replace(/AWAY_/, ''))

        updateScore(teamId, action).catch(err => console.log('Error updating score: ', err))
    }
)

export const scoreAtomLoadable = loadable(scoreAtom)

export const homeScoreAtom = atom(
    async get => {
        const score = await get(scoreAtom)

        return score.home
    },
    async (_get, _set, update: UpdateScoreAction | string) => {
        await updateScore(TeamIdentifier.home, update)
    }
)

export const homeScoreAtomLoadable = loadable(homeScoreAtom)

export const awayScoreAtom = atom(
    async get => {
        const score = await get(scoreAtom)

        return score.away
    },
    async (_get, _set, update: UpdateScoreAction | string) => {
        await updateScore(TeamIdentifier.away, update)
    }
)

export const awayScoreAtomLoadable = loadable(awayScoreAtom)

import {atom} from "jotai";
import {atomWithDefault, loadable} from "jotai/utils";
import {Container} from "typescript-ioc";

import {TeamsApi} from "../services";
import {TeamsModel} from "../models";

const service: TeamsApi = Container.get(TeamsApi)

export const teamAtom = atomWithDefault(async () => service.get())
export const teamAtomLoadable = loadable(teamAtom)

export const homeTeamAtom = atom(
    async get => {
        const teams: TeamsModel = await get(teamAtom)

        return teams.home
    }
)

export const homeTeamAtomLoadable = loadable(homeTeamAtom)

export const awayTeamAtom = atom(
    async get => {
        const teams: TeamsModel = await get(teamAtom)

        return teams.away
    }
)

export const awayTeamAtomLoadable = loadable(awayTeamAtom)

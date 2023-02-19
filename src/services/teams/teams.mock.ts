import {TeamsApi} from "./teams.api";
import {TeamsModel} from "../../models";

const teams: TeamsModel = {
    home: {
        name: 'Grace',
        color: 'navy'
    },
    away: {
        name: 'Harvest',
        color: 'maroon'
    }
}

export class TeamsMock implements TeamsApi {
    async get(): Promise<TeamsModel> {
        return teams
    }
}

import {ApolloClient, gql} from "@apollo/client";

import {TeamsApi} from "./teams.api";
import {getApolloClient} from "../../backends";
import {TeamsModel} from "../../models";

const GET_GAME_QUERY = gql`query { getGame { title home { name color logoUrl } away { name color logoUrl } } }`;

export class TeamsGraphql implements TeamsApi {
    client: ApolloClient<any>

    constructor() {
        this.client = getApolloClient()
    }

    get(): Promise<TeamsModel> {
        return this.client
            .query<{getGame: TeamsModel}>({query: GET_GAME_QUERY})
            .then(result => result.data.getGame)
    }

}
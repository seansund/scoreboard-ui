import {Container, Scope} from "typescript-ioc";
import {TeamsApi} from "./teams.api";
import {TeamsGraphql} from "./teams.graphql";

export * from './teams.api'

Container.bind(TeamsApi).to(TeamsGraphql).scope(Scope.Singleton)

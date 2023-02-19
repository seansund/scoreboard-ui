import {Container, Scope} from "typescript-ioc";
import {TeamsApi} from "./teams.api";
import {TeamsMock} from "./teams.mock";

export * from './teams.api'

Container.bind(TeamsApi).to(TeamsMock).scope(Scope.Singleton)

import {Container, Scope} from "typescript-ioc";
import {ScoresApi} from "./scores.api";
import {ScoresGraphql} from "./scores.graphql";

export * from './scores.api'

Container.bind(ScoresApi).to(ScoresGraphql).scope(Scope.Singleton)

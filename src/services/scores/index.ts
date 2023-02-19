import {Container, Scope} from "typescript-ioc";
import {ScoresApi} from "./scores.api";
import {ScoresMock} from "./scores.mock";

export * from './scores.api'

Container.bind(ScoresApi).to(ScoresMock).scope(Scope.Singleton)

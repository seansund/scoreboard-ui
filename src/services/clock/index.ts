import {Container, Scope} from "typescript-ioc";
import {ClockApi} from "./clock.api";
import {ClockMock} from "./clock.mock";

export * from './clock.api'

Container.bind(ClockApi).to(ClockMock).scope(Scope.Singleton)

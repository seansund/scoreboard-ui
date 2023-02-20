import {Container, Scope} from "typescript-ioc";
import {ClockApi} from "./clock.api";
import {ClockGraphql} from "./clock.graphql";

export * from './clock.api'

Container.bind(ClockApi).to(ClockGraphql).scope(Scope.Singleton)

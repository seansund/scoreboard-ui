import {TeamsModel} from "../../models";

export abstract class TeamsApi {
    abstract get(): Promise<TeamsModel>;
}

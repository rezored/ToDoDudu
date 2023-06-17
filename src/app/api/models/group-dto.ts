import { ListDTO } from "./list-dto";

export interface GroupDTO {
    "id": string,
    "name": string,
    "description": string,
    "lists": Array<ListDTO>
}[]
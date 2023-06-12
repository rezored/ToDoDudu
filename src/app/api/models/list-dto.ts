import { Card } from "./card-dto"

export interface ListDTO {
    "id": string,
    "name": string,
    "cards": Array<Card>
}[];

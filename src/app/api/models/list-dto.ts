import { Card } from "./card-dto"

export interface ListDTO {
    id: string,
    name: string,
    color?: string,
    cards: Array<Card>
}[];

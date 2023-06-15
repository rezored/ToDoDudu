import { LabelDTO } from "./label-dto";

export interface Card {
    id: string,
    name: string,
    description: string,
    isExpanded?: boolean,
    dueDate: Date,
    createdDate: Date,
    labels: Array<LabelDTO>,
}

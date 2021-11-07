import { TaskStatus } from "../task.model";

export class SearchTaskByFilter {
    status?: TaskStatus;
    search?: string;
}
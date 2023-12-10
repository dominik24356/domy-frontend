import {User} from "./user";

export class Task {
  constructor(
    public taskId?: number,
    public taskName?: string,
    public description?: string,
    public dueDate?: Date,
    public status?: string,
    public taskList?: any,
    public assignedUsers?: User[]
  ) {}
}

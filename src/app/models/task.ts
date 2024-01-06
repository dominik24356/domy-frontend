import {User} from "./user";

export class Task {
  constructor(
    public taskId?: number,
    public taskName?: string,
    public description?: string,
    public dueDate?: Date,
    public status?: TaskStatus,
    public taskList?: any,
    public assignedUsers?: User[],
    public comments?: Comment[],
    public attachments?: Attachment[],
    public labels?: Label[]
  ) {}
}


export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD'
}

export class Comment {
  constructor(
    public id?: number,
    public task?: Task,
    public author?: User,
    public content?: string,
    public creationDateTime?: Date
  ) {}
}

export class Attachment {
  constructor(
    public id?: number,
    public task?: Task,
    public link?: string,
    public displayText?: string,
    public creationDateTime?: Date
  ) {}
}

export class Label {
  constructor(
    public id?: number,
    public task?: Task,
    public color?: LabelColor,
    public name?: string
  ) {}
}

export enum LabelColor {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW'
}

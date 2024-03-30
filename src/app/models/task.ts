import {User} from "./user";

export class Task {
  constructor(
    public taskId?: number,
    public taskName?: string,
    public description?: string,
    public dueDate?: Date,
    public status?: TaskStatus,
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
    public commentId?: number,
    public authorName?: string,
    public content?: string,
    public createdAt?: Date
  ) {}
}

export class Attachment {
  constructor(
    public attachmentId?: number,
    public link?: string,
    public name?: string,
    public createdAt?: Date
  ) {}
}

export class Label {
  constructor(
    public labelId?: number,
    public color?: LabelColor,
    public name?: string,
    public taskIds?: number[]
  ) {}
}

export enum LabelColor {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW'
}

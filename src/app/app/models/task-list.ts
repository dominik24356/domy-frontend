import { Task } from './task';

export class TaskList {
  constructor(
    public listId?: number,
    public listName?: string,
    public board?: any,
    public tasks?: Task[]
  ) {}
}

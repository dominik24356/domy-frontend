import {TaskList} from "./task-list";

export class Board {
  constructor(
    public boardId?: number,
    public user?: any,
    public boardName?: string,
    public taskLists?: TaskList[]
  ) {}
}

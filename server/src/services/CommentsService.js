import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"


class CommentsService {

  async createComment(commentData) {
    const towerEvent = await towerEventsService.getEventById(commentData.eventId)
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', '-email -subs')
    return comment
  }
}

export const commentsService = new CommentsService()
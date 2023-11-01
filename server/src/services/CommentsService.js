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

  async getCommentsByEvent(towerEventId) {
    const comments = await dbContext.Comments.find({ eventId: towerEventId }).populate('creator', '-email -subs')
    return comments
  }
}

export const commentsService = new CommentsService()
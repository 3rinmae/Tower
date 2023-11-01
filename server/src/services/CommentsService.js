import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
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

  async destroyComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest(`${commentId} is not a valid ID`)
    }

    if (comment.creatorId.toString() != userId) {
      throw new Forbidden('This is not your comment to delete')
    }
    await comment.delete()
    return "Your comment has been deleted"
  }
}

export const commentsService = new CommentsService()
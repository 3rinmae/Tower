import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {

async getCommentsByEvent(towerEventId){
  const res = await api.get(`api/events/${towerEventId}/comments`)
  logger.log('get comments by event', res.data)
  AppState.comments = res.data.map((comment) => new Comment(comment))
}
}

export const commentsService = new CommentsService()
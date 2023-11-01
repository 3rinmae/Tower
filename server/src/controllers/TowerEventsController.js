import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:towerEventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:towerEventId', this.updateEvent)
  }

  async createEvent(req, res, next) {
    try {
      const towerEventData = req.body
      const userId = req.userInfo.id
      towerEventData.creatorId = userId
      const towerEvent = await towerEventsService.createEvent(towerEventData)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req, res, next) {
    try {
      const query = req.query
      const towerEvents = await towerEventsService.getAllEvents(query)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const towerEvent = await towerEventsService.getEventById(towerEventId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async updateEvent(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const userId = req.userInfo.id
      const towerEventData = req.body
      const updatedEvent = await towerEventsService.updateEvent(towerEventId, userId, towerEventData)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    }
  }
}
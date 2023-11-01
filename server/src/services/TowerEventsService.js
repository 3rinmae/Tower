import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TowerEventsService {

  async createEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', '-email -subs')
    await towerEvent.populate('ticketCount')
    return towerEvent
  }

  async getAllEvents(query) {
    const towerEvents = await dbContext.TowerEvents.find(query)
      .populate('creator', '-email -subs')
      .populate('ticketCount')
    return towerEvents
  }

  async getEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator', '-email -subs')
      .populate('ticketCount')
    if (!towerEvent) {
      throw new BadRequest(`${towerEventId} is not a valid ID`)
    }
    return towerEvent
  }

  async updateEvent(towerEventId, userId, towerEventData) {
    const towerEventToBeUpdated = await this.getEventById(towerEventId)
    if (towerEventToBeUpdated.creatorId.toString() != userId) {
      throw new Forbidden('This is not your event to update')
    }
    if (towerEventToBeUpdated.isCanceled == true) {
      throw new BadRequest('This event is canceled and cannot be edited')
    }
    towerEventToBeUpdated.name = towerEventData.name || towerEventToBeUpdated.name
    towerEventToBeUpdated.description = towerEventData.description || towerEventToBeUpdated.description
    towerEventToBeUpdated.coverImg = towerEventData.coverImg || towerEventToBeUpdated.coverImg
    towerEventToBeUpdated.location = towerEventData.location || towerEventToBeUpdated.location
    towerEventToBeUpdated.capacity = towerEventData.capacity || towerEventToBeUpdated.capacity
    towerEventToBeUpdated.startDate = towerEventData.startDate || towerEventToBeUpdated.startDate
    towerEventToBeUpdated.type = towerEventData.type || towerEventToBeUpdated.type
    await towerEventToBeUpdated.save()
    return towerEventToBeUpdated
  }

  async cancelEvent(towerEventId, userId) {
    const towerEvent = await this.getEventById(towerEventId)
    if (towerEvent.creatorId.toString() != userId) {
      throw new Forbidden('This is not your event to cancel')
    }
    towerEvent.isCanceled = !towerEvent.isCanceled
    await towerEvent.save()
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService()
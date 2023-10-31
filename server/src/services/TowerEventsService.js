import { dbContext } from "../db/DbContext.js"


class TowerEventsService {

  async createEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', '-email -subs')
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService()
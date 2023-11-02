import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {

  async getTowerEvents(){
    const res = await api.get('api/events')
    // logger.log('get events', res.data)
    AppState.towerEvents = res.data.map((towerEvent) => new TowerEvent(towerEvent))
  }

  async createEvent(eventData){
    const res = await api.post(`api/events`, eventData)
    logger.log('create event', res.data)
    const newEvent = new TowerEvent(res.data)
    AppState.towerEvents.unshift(newEvent)
    return newEvent
  }
}

export const eventsService = new EventsService()
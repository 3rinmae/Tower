import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {

  async getTowerEvents(){
    const res = await api.get('api/events')
    // logger.log('get events', res.data)
    AppState.towerEvents = res.data.map((towerEvent) => new TowerEvent(towerEvent))
  }

  async createEvent(eventData){
    const res = await api.post(`api/events`, eventData)
    // logger.log('create event', res.data)
    const newEvent = new TowerEvent(res.data)
    AppState.towerEvents.unshift(newEvent)
    return newEvent
  }

  async getEventById(towerEventId){
    AppState.activeEvent = null
    const res = await api.get(`api/events/${towerEventId}`)
    // logger.log('get event by id', res.data)
    AppState.activeEvent = new TowerEvent(res.data)
  }

  async cancelEvent(towerEventId){
    const res = await api.delete(`api/events/${towerEventId}`)
    logger.log('cancel event', res.data)
    AppState.activeEvent = new TowerEvent(res.data)
  }
}

export const eventsService = new EventsService()
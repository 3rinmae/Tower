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
}

export const eventsService = new EventsService()
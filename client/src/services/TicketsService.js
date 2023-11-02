import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketsService {
async getTicket(towerEventId){
  const eventData = {eventId: towerEventId}
  const res = await api.post('api/tickets', eventData)
  logger.log('get ticket', res.data)
}
}

export const ticketsService = new TicketsService()
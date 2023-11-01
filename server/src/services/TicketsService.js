import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"


class TicketsService {

  async createTicket(ticketData) {
    const towerEvent = await towerEventsService.getEventById(ticketData.eventId)
    if (towerEvent.isCanceled) {
      throw new Forbidden(`${towerEvent.name} has been cancelled`)
    }
    // if (towerEvent.startDate == current date - 1) {
    //   throw new Forbidden(`${towerEvent.name} has already taken place`)
    // }
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', '-email -subs')
    await ticket.populate('towerEvent')
    return ticket
  }
}

export const ticketsService = new TicketsService()
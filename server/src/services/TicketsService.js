import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
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
    await ticket.populate('event')
    return ticket
  }

  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId })
      .populate('event')
    return tickets
  }

  async getTicketsByEvent(towerEventId) {
    const tickets = await dbContext.Tickets.find({ eventId: towerEventId }).populate('profile', '-email -subs')
    return tickets
  }

  async destroyTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) {
      throw new BadRequest(`${ticketId} is not a valid ID`)
    }
    if (ticket.accountId.toString() != userId) {
      throw new Forbidden('Not your ticket to delete')
    }
    await ticket.delete()
    return "Ticket has been deleted"
  }
}

export const ticketsService = new TicketsService()
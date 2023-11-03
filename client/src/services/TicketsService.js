import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class TicketsService {
async getTicket(towerEventId){
  const eventData = {eventId: towerEventId}
  const res = await api.post('api/tickets', eventData)
  // logger.log('get ticket', res.data)
  AppState.tickets.push( new Ticket(res.data))
  // const res1 = await api.get(`api/events/${towerEventId}/tickets`)
  // AppState.activeEvent.ticketCount = res1.data.length
AppState.activeEvent.ticketCount += 1  
  // logger.log('AppState tickets', AppState.tickets)
  Pop.success('You have successfully gotten a ticket for this event!')
  // logger.log('appstate ticket count', AppState.activeEvent)
  // logger.log(AppState.tickets)
}

async getTicketsByEvent(towerEventId){
  const res = await api.get(`api/events/${towerEventId}/tickets`)
  // logger.log('get tickets by event', res.data)
  AppState.tickets = res.data.map((ticket) => new Ticket(ticket))
}

async getMyTickets(){
  const res = await api.get(`account/tickets`)
  logger.log('get my tickets', res.data)
  AppState.myTickets = res.data.map((ticket) => new Ticket(ticket))
}

async destroyTicket(ticketId){
  const res = await api.delete(`api/tickets/${ticketId}`)
  logger.log(res.data)
  AppState.myTickets = AppState.myTickets.filter((ticket) => ticket.id != ticketId)
}
}

export const ticketsService = new TicketsService()
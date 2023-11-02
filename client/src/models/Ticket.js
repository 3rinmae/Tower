export class Ticket{
  constructor(data){
    this.id = data.id || data._id
    this.createdAt = new Date(data.createdAt)
    this.event = data.event
    this.eventId = data.eventId
    this.creator = data.profile
  }
}
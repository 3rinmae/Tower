export class TowerEvent {
  constructor(data){
    this.id = data.id || data._id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.isCanceled = data.isCanceled
    this.category = data.type
    this.ticketCount = data.ticketCount
    this.startDate = new Date(data.startDate)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
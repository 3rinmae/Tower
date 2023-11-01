export class Comment{
  constructor(data){
    this.id = data.id
    this.body = data.body
    this.eventId = data.eventId
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}
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

// const model {
//   name: { type: String, required: true, maxLength: 50 },
//   description: { type: String, required: true, maxLength: 1000 },
//   coverImg: { type: String, required: true, maxLength: 1000 },
//   location: { type: String, required: true, maxLength: 50 },
//   capacity: { type: Number, required: true, maxLength: 100000, minLength: 1 },
//   startDate: { type: Date, required: true },
//   isCanceled: { type: Boolean, required: true, default: false },
//   creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
//   type: { type: String, enum: ['concert', 'convention', 'digital', 'sport'], required: true }
// }
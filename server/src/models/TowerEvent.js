import { Schema } from "mongoose";


export const TowerEventSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 500 },
  coverImg: { type: String, required: true, maxLength: 1000 },
  location: { type: String, required: true, maxLength: 50 },
  capacity: { type: Number, required: true, maxLength: 100000, minLength: 1 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  type: { type: String, enum: ['concert', 'convention', 'digital', 'sport'], required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// TowerEventSchema.virtual('ticketCount', {
//   localField: '_id',
//   foreignField: 'towerEventId',
//   ref: 'Ticket',
//   count: true
// })
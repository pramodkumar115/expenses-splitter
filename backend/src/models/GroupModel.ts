import { Model, Schema } from "mongoose";
import { ITrip } from "./TripsModel";
import { IParticipant } from "./ParticipantModel";

export interface IGroup {
    groupName: string,
    trip: ITrip,
    participants?: IParticipant[]
}

export const GroupSchema = new Schema<IGroup, Model<IGroup>>({
    groupName: {type: String},
    trip: {type: Schema.ObjectId, ref: "Trips"},
    participants: [{type: Schema.ObjectId, ref: "Participants"}]
})
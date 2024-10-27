import { model, Model, Schema } from "mongoose";
import { IGroup } from "./GroupModel";
import { IUser } from "./UserModel";

export interface IParticipant {
    name: string,
    emailId: string,
    user?: IUser,
    group: IGroup,
}

export const ParticipantSchema = new Schema<IParticipant, Model<IParticipant>>({
    name: {type: String},
    emailId: {type: String},
    user: {type: Schema.ObjectId, ref: "User"},
    group: {type: Schema.ObjectId, ref: "Group"}
})

export const ParticipantModel = model("Participants", ParticipantSchema);
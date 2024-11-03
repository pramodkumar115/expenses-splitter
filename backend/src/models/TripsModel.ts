import { model, Model, Schema } from "mongoose"
import { IGroup } from "./GroupModel";
import { IExpense } from "./ExpenseModel";
import { IUser } from "./UserModel";

export interface ITrip {
    _id?: string,
    name: string,
    description: string,
    totalAmount?: number,
    ccy?: string,
    groups?: IGroup[],
    expenses?: IExpense[],
    createdBy?: IUser,
    createdDate: Date,
    lastUpdatedBy?: IUser,
    lastUpdatedDate: Date
}

export const TripsSchema = new Schema<ITrip, Model<ITrip>>({
    name: {type: String},
    description: {type: String},
    totalAmount: {type: Number},
    ccy: {type: String},
    groups: [{type: Schema.ObjectId, ref: "Groups"}],
    expenses: [{type: Schema.ObjectId, refs: "Expenses"}],
    createdBy: {type: Schema.ObjectId, refs: "Users"},
    createdDate: {type: Date},
    lastUpdatedBy: {type: Schema.ObjectId, refs: "Users"},
    lastUpdatedDate: {type: Date}
});

export const TripModel = model("Trips", TripsSchema);
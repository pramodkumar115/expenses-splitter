import { model, Model, Schema } from "mongoose"
import { IGroup } from "./GroupModel";
import { IExpense } from "./ExpenseModel";

export interface ITrip {
    name: string,
    description: string,
    totalAmount: number,
    ccy: string,
    groups?: IGroup[],
    expenses?: IExpense[]
}

export const TripsSchema = new Schema<ITrip, Model<ITrip>>({
    name: {type: String},
    description: {type: String},
    totalAmount: {type: Number},
    ccy: {type: String},
    groups: [{type: Schema.ObjectId, ref: "Groups"}],
    expenses: [{type: Schema.ObjectId, refs: "Expenses"}]
});

export const TripModel = model("Trips", TripsSchema);
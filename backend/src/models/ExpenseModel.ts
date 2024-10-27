import { model, Model, Schema } from "mongoose";
import { IParticipant } from "./ParticipantModel";

export interface IExpense {
    name: string,
    description: string,
    contribution: {participant: IParticipant, amount: number, ccy: string}[]
}

export const ExpenseSchema = new Schema<IExpense, Model<IExpense>>({
    name: {type: String},
    description: {type: String},
    contribution: [{participant: {type: Schema.ObjectId, ref: "Participants"}, amount: Number, ccy: String}]
});

export const ExpenseModel = model("Expense", ExpenseSchema);
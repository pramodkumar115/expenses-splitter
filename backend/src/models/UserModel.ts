import {model, Model, Schema} from "mongoose";


export interface IUser {
    _id?: string,
    emailId: string,
    password: string,
    userProfile: {
        _id?: string,
        firstName: string,
        lastName: string,
        defaultCcy?: string
    }
}

export const UserSchema = new Schema<IUser, Model<IUser>>({
    emailId: {type: String},
    password: {type: String},
    userProfile: {
        type: {
            firstName: {type: String},
            lastName: {type: String},
            defaultCcy: {type: String}
        }
    }
});

export const UserModel = model("Users", UserSchema);
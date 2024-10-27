import bcrypt from "bcryptjs";

export const createHash = (text: string) => {
    return bcrypt.hashSync(text, 10)
}

export const comparePassword = (value: string, hashValue: string) => {
    return bcrypt.compareSync(value, hashValue);
}
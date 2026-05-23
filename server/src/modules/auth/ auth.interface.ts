import {Document} from "mongoose"

export interface IAuth extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IRegisterPayload {
    email: string;
    password: string;
    username: string;
}

export interface IAuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: Partial<IAuth>;
}
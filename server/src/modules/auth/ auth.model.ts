import {IAuth} from "./ auth.interface";
import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema<IAuth>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Auth = mongoose.model<IAuth>("Auth", AuthSchema);

export default Auth;
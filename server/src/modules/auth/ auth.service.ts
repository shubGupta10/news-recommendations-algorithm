import Auth from "./ auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (name: string, email: string, password: string) => {
    try{
        const normalizedName = name?.trim();
        const normalizedEmail = email?.trim().toLowerCase();
        const normalizedPassword = password?.trim();

        if(!normalizedName || !normalizedEmail || !normalizedPassword){
            throw new Error("All fields are required");
        }

        const checkUserExits = await Auth.findOne({
            email: normalizedEmail
        })
        if(checkUserExits){
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(normalizedPassword, salt);

        const newUser = await Auth.create({
            name: normalizedName,
            email: normalizedEmail,
            password: hashPassword
        })

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "7d" }
        );

        return {
            success: true,
            message: "User registered successfully",
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        };
    }catch (error: any){
        throw new Error("Something went wrong");
    }
}

const loginUser = async (email: string, password: string) => {
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedPassword = password?.trim();

    if(!normalizedEmail || !normalizedPassword){
        throw new Error("All fields are required");
    }

    const user = await Auth.findOne({
        email: normalizedEmail
    })

    if(!user){
        throw new Error("Invalid email or password");
    }

    const verifyPassword = await bcrypt.compare(normalizedPassword, user.password);

    if(!verifyPassword){
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
    );

    return {
        success: true,
        message: "Login successful",
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    };
}

export const authService =  {
    registerUser,
    loginUser
};

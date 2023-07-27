import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import bcrupt from "bcrypt";

interface UserDocument extends Document {
    email: string;
    name: string;
    password: string;
    role: "admin" | "user";
}
    
interface Methods {
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true},
    role: { type: String, enum: ["admin", "user"], default: "user" },
});

//Hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrupt.genSalt(10);
        this.password = await bcrupt.hash(this.password, salt);
        next();
    } catch (err) {
        throw(err);
    }
});

//Compare password method
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrupt.compare(password, this.password);
    } catch (err) {
        throw(err);
    }
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Methods>;
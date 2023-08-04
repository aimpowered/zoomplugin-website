import { model, models, Schema } from "mongoose";

const messageSchema = new Schema({
    message: { type: String, required: true, },
});

const MessageModel = models.Message || model('Message', messageSchema);

export default MessageModel;
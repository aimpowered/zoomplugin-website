// Hello World API

import startDB from "@/lib/db";
import MessageModel from "@/models/messageModel";

export const POST = async (req: Request, res: Response) => {
    const body = await req.json();
    const msg = body.newMessage;

    await startDB();

    const message = await MessageModel.create({ message : msg });

    return new Response(
        JSON.stringify({
            id: message._id.toString(),
            message: message.message,
        })
    );
};



export const GET = async (req: Request, res: Response) => {
    
    const data = await MessageModel.find();

    return new Response(
        JSON.stringify({
            body:data,
        })
    );
};

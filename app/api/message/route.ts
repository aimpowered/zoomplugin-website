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
    
    await startDB();
    
    const data = await MessageModel.find();

    return new Response(
        JSON.stringify({
            body:data,
        })
    );
};

export const DELETE = async (req: Request) => {
    await startDB();
    const params = new URLSearchParams(req.url.split('?')[1]); // Extract query parameters

    const messageId = params.get('id');

    if (!messageId) {
        return new Response(
            JSON.stringify({
                error: "Message ID is missing."
            }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    await MessageModel.deleteOne({ _id: messageId });

    return new Response(
        JSON.stringify({
            body: {
                id: messageId
            }
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    );
};

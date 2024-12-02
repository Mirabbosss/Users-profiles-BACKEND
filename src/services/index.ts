import { Response } from "express";

export const respond = (res: Response, statusCode: number, success: boolean, message: string, data?: object) => {
    const response: any = { success, message };

    if(data !== undefined && data !== null) {
        response.data = data;
    }

    res.status(statusCode).json(response);
}
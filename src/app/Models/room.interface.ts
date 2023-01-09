import { IMassege } from "./";

export interface IChatRoom{
    id: string,
    roomName: string,
    masseges: Array<IMassege>,
    createdUserId:string
}
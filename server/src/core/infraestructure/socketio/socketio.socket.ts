import { Socket } from "socket.io";
import { ISocket } from "../../application/socket/ISocket";

export class SocketIO implements ISocket {
    constructor(private client : Socket){}
    leave(room: string): void {
        this.client.leave(room);
    }
    join(room: string): void {
        this.client.join(room);
    }

}
import { ILogger } from "../../application/logger/ilogger";

export class NodeLogger implements ILogger{
    log(...data: string[]): void {
        console.log(`[${data[0]}] ${data[1]} ${data[2]}`)
    }
    error(error: Error, ...data: string[]): void {

        console.log(`[ERROR in ${data[0]}]`, error)
    }

}
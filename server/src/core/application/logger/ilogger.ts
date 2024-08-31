export interface ILogger{
    log(...data: string[]): void
    error(error : Error, ...data: string[]):void
}
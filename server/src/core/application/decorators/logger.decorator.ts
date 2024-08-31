import { Result } from "../../../utils/result";
import { ILogger } from "../logger/ilogger";
import { ApplicationService } from "../service/application.service";

export class LoggerDecorator<T,R> implements ApplicationService<T,R>{
    constructor(
        private service : ApplicationService<T,R>,
        private logger : ILogger,
        private title : string
    ){}
    async execute(data: T): Promise<Result<R>> {
        this.logger.log(this.title,'IN', JSON.stringify(data))
        const result  = await this.service.execute(data)
        if ( result.isSuccessful() ) {
            this.logger.log(this.title, 'OUT', JSON.stringify(result.value))
            return result
        }
        this.logger.error(result.error!, this.title)
        return result
    }

}
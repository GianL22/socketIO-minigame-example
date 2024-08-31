import { Result } from "../../../utils/result";
import { ApplicationService } from "../service/application.service";

export class ErrorHandler<T,R> implements ApplicationService<T,R>{
    constructor(
        private service : ApplicationService<T,R>,
    ){}
    async execute(data: T): Promise<Result<R>> {
        try {
            const result  = await this.service.execute(data)
            return result
        } catch (error) {
            return Result.makeError(error as Error)
        }
    }

}
import { Result } from "../../../utils/result";

export interface ApplicationService<T,R>{
    execute(data : T): Promise<Result<R>>
}
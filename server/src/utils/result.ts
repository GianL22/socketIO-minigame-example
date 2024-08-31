export class Result<T>{

    private constructor(private _value?: T, private _error?: Error) {
        if (_value !== undefined && _error !== undefined)
            throw new Error('Value and error cannot be undefined in the same time')
    }

    get value(): T {
        if (this._error) throw this._error
        return this._value!
    }

    get error(){
        if (this._value) throw new Error('There is no error')
        return this._error
    }

    isSuccessful() {
        if (this._error) return false
        return true
    }

    static makeSuccessful<T>(value : T){
        return new Result<T>(value)
    }

    static makeError<T>(error: Error){
        return new Result<T>(undefined, error)
    }


}
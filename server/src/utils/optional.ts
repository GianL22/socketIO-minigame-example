export class Optional<T> {
    constructor(
        private _value ?: T
    ){}

    hasValue() : boolean {
        return (this._value != undefined) 
    }

    get value(){
        if (this._value != undefined) return this._value
        throw Error('There is no value')
    }

}
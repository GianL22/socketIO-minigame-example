export class Event{

    private constructor(private _name: string, private _data : object, private _timestamp : Date, ){}
    
    get name() : string {
        return this._name
    }
    
    get data() : object {
        return this._data
    }

    
    get timestamp() : Date {
        return this._timestamp
    }
    
    static create(name : string, data : object, timestamp ?: Date){
        return new Event(
            name,
            {
                ...data
            },
            (timestamp) ? timestamp : new Date()
        )       
    }
}
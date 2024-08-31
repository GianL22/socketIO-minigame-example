using System;
using System.Collections;
using System.Collections.Generic;
public class Result<T> where T : class
{

    private readonly T _value;
    private readonly Exception _error;
    private Result(T value, Exception error)
    {
        if (value == null &&  error == null)
            throw new ArgumentNullException("Must have a value or error");
        _value = value;
        _error = error;
    }

    public bool IsSuccessful()
    {
        return (this._value != null);
    }

    public T Value { get {
            if (_value == null) throw new Exception("Not Value provided");
            return _value;
        } 
    }

    public Exception Exception { get
        {
            if (_error == null) throw new Exception("Not Error Provided");
            return _error;
        } 
    }

    public static Result<T> MakeSuccesful(T value)
    {
        return new Result<T>(value, null);
    }

    public static Result<T> MakeError(Exception error)
    {
        return new Result<T>(null, error);
    }

}

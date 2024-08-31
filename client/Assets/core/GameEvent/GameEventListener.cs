using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;




[System.Serializable]
public class CustomGameEvent : UnityEvent<object> { }

public class GameEventListener : MonoBehaviour
{
    public GameEvent gameEvent;

    public CustomGameEvent response;

    private void OnEnable()
    {
        gameEvent.RegisterListener(this);
    }
    private void OnDisable()
    {
        gameEvent.RemoveListener(this);
    }

    public void OnEventRaised(object data)
    {
        response.Invoke(data);
    }
}

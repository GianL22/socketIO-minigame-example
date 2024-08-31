using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class JoinServerScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public string serverIPInputText = string.Empty;
    public string serverPORTInputText = string.Empty;
    private VisualElement root;

    private const string SERVER_IP_TEXTFIELD_NAME = "IP";
    private const string SERVER_PORT_TEXTFIELD_NAME = "PORT";
    private const string SERVER_JOIN_BUTTON_NAME = "JOIN";

    private TextField serverIPTextField;
    private TextField serverPORTTextField;
    private Button joinButton;

    [Header("Events")]
    public GameEvent JoinButtonClickedEvent;

    private void Start()
    {
        root = document.rootVisualElement;
        serverIPTextField = root.Q<TextField>(SERVER_IP_TEXTFIELD_NAME);
        serverPORTTextField = root.Q<TextField>(SERVER_PORT_TEXTFIELD_NAME);
        serverIPTextField.value = serverIPInputText;
        //TODO : PORT must be numbers
        serverPORTTextField.value = serverPORTInputText;
        joinButton = root.Q<Button>(SERVER_JOIN_BUTTON_NAME);
        joinButton.RegisterCallback<ClickEvent>(JoinButtonClicked);

    }
    public void EnableAll(object obj)
    {
        SetEnabledAll(true);
    }
    public void DisableAll(object obj)
    {
        SetEnabledAll(false);
    }
    private void SetEnabledAll(bool enabled)
    {
        joinButton.SetEnabled(enabled);
        serverIPTextField.SetEnabled(enabled);
        serverPORTTextField.SetEnabled(enabled);
    }
    private void JoinButtonClicked(ClickEvent evt)
    {
        SetEnabledAll(false);
        Debug.Log("Se hizo click en join");
        JoinButtonClickedEvent.Raise(
            JsonConvert.SerializeObject(
                new
                {
                    IP = serverIPTextField.text,
                    PORT = serverPORTTextField.text,
                }
            )
        );
    }

    

}

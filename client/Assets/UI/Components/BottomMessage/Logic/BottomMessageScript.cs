using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class BottomMessageScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    
    private const string MESSAGE_LABEL_NAME = "Message";
    private Label messageLabel;

    private void Start()
    {
        var root = document.rootVisualElement;
        messageLabel = root.Q<Label>(name : MESSAGE_LABEL_NAME);
        Hide();

    }

    public void ShowMessage(object message)
    {
        var messageStr = message as string;
        messageLabel.text = messageStr;
        messageLabel.style.color = new StyleColor(Color.white);
        messageLabel.style.display = DisplayStyle.Flex;
    }

    public void ShowMessageStaticMessage(string staticMessage)
    {
        messageLabel.text = staticMessage;
        messageLabel.style.color = new StyleColor(Color.white);
        messageLabel.style.display = DisplayStyle.Flex;
    }

    public void ShowError(object err)
    {
        var exception = (Exception) err;
        messageLabel.text = exception.Message;
        messageLabel.style.color = new StyleColor(Color.red);
        messageLabel.style.display = DisplayStyle.Flex;

    }

    public void Hide()
    {
        messageLabel.style.display = DisplayStyle.None;
    }

}

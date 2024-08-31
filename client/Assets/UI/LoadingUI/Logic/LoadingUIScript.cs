using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing.Text;
using Unity.VisualScripting.FullSerializer;
using UnityEngine;
using UnityEngine.UIElements;

public class LoadingUIScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument _document;
    const string LABEL_HEADER_NAME = "text-header";
    const string LABEL_BODY_NAME = "text-body";

    private VisualElement root;
    private Label labelHeader;
    private Label labelBody;

    private void Start()
    {
        root = _document.rootVisualElement;
        labelHeader = root.Q<Label>(name: LABEL_HEADER_NAME);
        labelBody = root.Q<Label>(name: LABEL_BODY_NAME);
    }

    public void Show(object bodyMessage)
    {
        labelHeader.text = "Loading";
        labelBody.text = (string) bodyMessage;
        _document.enabled = true;
    }

    public void ShowErrorMessage(object Error)
    {
        labelBody.text = ((Exception) Error).Message;
        _document.enabled = true;
    }

    public void Hide()
    {
        _document.enabled = false;
    }


}

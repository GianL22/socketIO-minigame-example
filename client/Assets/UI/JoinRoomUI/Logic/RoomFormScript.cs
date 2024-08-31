using System.Collections;
using System.Collections.Generic;
using System.Web;
using UnityEngine;
using UnityEngine.UIElements;

public class RoomFormScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    private const string ROOMNAME_TEXTFIELD_NAME = "RoomNameInput";
    private const string JOIN_BUTTON_NAME = "Join";
    private const string CREATE_BUTTON_NAME = "Create";

    private TextField nameRoomInput;
    private Button joinRoomButton;
    private Button createRoomButton;

    [Header("Events")]
    public GameEvent joinRoomButtonClicked;
    public GameEvent createRoomButtonClicked;

    private void Start()
    {
        var root = document.rootVisualElement;
        nameRoomInput = root.Q<TextField>(name: ROOMNAME_TEXTFIELD_NAME);
        nameRoomInput.value = string.Empty;
        joinRoomButton = root.Q<Button>(name: JOIN_BUTTON_NAME);
        createRoomButton = root.Q<Button>(name: CREATE_BUTTON_NAME);
        createRoomButton.RegisterCallback<ClickEvent>(OnCreateRoomButtonClicked);
        joinRoomButton.RegisterCallback<ClickEvent>(OnJoinRoomButtonCliked);
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
        joinRoomButton.SetEnabled(enabled);
        createRoomButton.SetEnabled(enabled);
        nameRoomInput.SetEnabled(enabled);
    }

    private void OnJoinRoomButtonCliked(ClickEvent e)
    {
        SetEnabledAll(false);
        joinRoomButtonClicked.Raise(nameRoomInput.text);
    }

    private void OnCreateRoomButtonClicked(ClickEvent e)
    {
        SetEnabledAll(false);
        createRoomButtonClicked.Raise(nameRoomInput.text);
    }


}
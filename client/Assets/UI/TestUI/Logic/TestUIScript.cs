using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class TestUIScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    
    public const string dataLabelClassName = "data-received-label";
    public const string createRoommButtonClickedClassName = "create-room-button";
    public const string addPlayerButtonClassName = "add-player-button";

    Label dataLabel;
    Button createRoomButton;
    Button addPlayerButton;
    TextField roomInputTextField;


    [Header("UI Events")]
    public GameEvent createRoommButtonClicked;
    public GameEvent addPlayerButtonClicked;


    private void OnEnable()
    {
        var root = document.rootVisualElement;
        if (root != null)
        {
            dataLabel = root.Q<Label>(className: dataLabelClassName);
            createRoomButton = root.Q<Button>(className: createRoommButtonClickedClassName);
            addPlayerButton = root.Q<Button>(className: addPlayerButtonClassName);
            roomInputTextField = root.Q<TextField>( name: "room-input" );

            createRoomButton.RegisterCallback<ClickEvent>(CreateRoommButtonClicked);
            addPlayerButton.RegisterCallback<ClickEvent>(AddPlayerButtonClicked);
        }

    }

    private void CreateRoommButtonClicked(ClickEvent evt)
    {
        //print(roomInputTextField.text);
        createRoommButtonClicked.Raise(roomInputTextField.text);
    }

    private void AddPlayerButtonClicked(ClickEvent evt)
    {
        addPlayerButtonClicked.Raise("dadasda");
    }
}

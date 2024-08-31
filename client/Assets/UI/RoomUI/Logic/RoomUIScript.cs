using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class RoomUIScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public VisualTreeAsset playerTemplate;

    private const string ROOMNAME_LABEL_NAME = "RoomName";
    private const string PLAYERS_CONTAINER_NAME = "PlayersContainer";
    private const string TOGGLE_READY_BUTTON_NAME = "ToggleReadyButton";
    private const string LEAVE_BUTTON_NAME = "LeaveRoomButton";

    private Label nameRoomLabel;
    private VisualElement playersContainer;
    private Button toggleReadyButton;
    private Button leaveRoomButton;

    private RoomStateScript roomState;

    [Header("Events")]
    public GameEvent toggleReadyButtonClicked;
    public GameEvent leaveRoomButtonClicked;

    private void Start()
    {
        roomState = GameObject.FindGameObjectWithTag("RoomState").GetComponent<RoomStateScript>();
        var root = document.rootVisualElement;
        nameRoomLabel = root.Q<Label>(ROOMNAME_LABEL_NAME);
        nameRoomLabel.text = roomState.roomId;
        playersContainer = root.Q<VisualElement>(PLAYERS_CONTAINER_NAME);
        toggleReadyButton = root.Q<Button>(TOGGLE_READY_BUTTON_NAME);
        if (roomState.isCurrentClientOwner)
        {
            toggleReadyButton.style.display = DisplayStyle.Flex;
        }
        else
        {
            toggleReadyButton.style.display = DisplayStyle.None;
        }
        toggleReadyButton.RegisterCallback<ClickEvent>(OnToggleReadyButtonClicked);
        leaveRoomButton = root.Q<Button>(LEAVE_BUTTON_NAME);
        leaveRoomButton.RegisterCallback<ClickEvent>(OnLeaveRoomButtonClicked);
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
        toggleReadyButton.SetEnabled(enabled);
        leaveRoomButton.SetEnabled(enabled);
    }

    public void UpdatePlayersSprites(object playersObjs)
    {
        var players = (Dictionary<string, string>[])playersObjs;
        playersContainer.Clear();
        foreach (var player in players)
        {
            playersContainer.Add(CreatePlayerVisualElement(player));
        }
    }

    private VisualElement CreatePlayerVisualElement(Dictionary<string,string> player)
    {
        var playerVE = playerTemplate.CloneTree();
        playerVE.AddToClassList("player-template");
        playerVE.Q<Label>().text = player["playerName"];
        playerVE.Q<VisualElement>(className: "player-sprite").style.unityBackgroundImageTintColor = ColorParser.ColorIdToUnityColor(player["playerColor"]);
        return playerVE;
    }

    private void OnToggleReadyButtonClicked(ClickEvent e)
    {
        toggleReadyButtonClicked.Raise(roomState.roomId);
    }

    private void OnLeaveRoomButtonClicked(ClickEvent e)
    {
        print(roomState.roomId);
        leaveRoomButtonClicked.Raise(roomState.roomId);
    }
}

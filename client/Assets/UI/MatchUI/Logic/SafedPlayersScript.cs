using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class SafedPlayersScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public VisualTreeAsset playerTemplate;

    private const string SAFED_PLAYER_LIST_NAME = "SafedPlayerList";

    private VisualElement safedPlayersList;

    private void Start()
    {
        var root = document.rootVisualElement;
        safedPlayersList = root.Q<VisualElement>(SAFED_PLAYER_LIST_NAME);
    }

    public void UpdateSafedPlayersList(object currentRoundObj)
    {
        var safedPlayers = ((CurrentRoundDTO)currentRoundObj).safedPlayers;

        safedPlayersList.Clear();

        foreach (var player in safedPlayers)
        {
            var playerProfileContainer = CreateSafedPlayer(player);

            safedPlayersList.Add(playerProfileContainer);
        }


    }

    private VisualElement CreateSafedPlayer(PlayerResponse player)
    {
        var playerProfileContainer = new VisualElement();
        playerProfileContainer.AddToClassList("player-profile-container");
        var playerVE = playerTemplate.CloneTree();
        playerVE.AddToClassList("player-remain-profile");
        playerVE.Q<Label>().text = player.name;
        playerVE.Q<VisualElement>(className: "player-sprite").style.unityBackgroundImageTintColor = ColorParser.ColorIdToUnityColor(player.color);
        playerProfileContainer.Add(playerVE);
        return playerProfileContainer;
    }
}

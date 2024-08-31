using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

public class RemainPlayersScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public VisualTreeAsset playerTemplate;
    public VisualTreeAsset playerEliminatedTemplate;
    public VisualTreeAsset playerHasPowerTemplate;
    public float AnimationTime = 0.1f;

    private const string REMAIN_PLAYER_LIST_NAME = "RemainPlayerList";

    private VisualElement remainPlayersList;

    private void Start()
    {
        var root = document.rootVisualElement;
        remainPlayersList = root.Q<VisualElement>(REMAIN_PLAYER_LIST_NAME);
    }

    public void UpdateRemainPlayersList(object currentRoundObj)
    {
        var remainPlayers = ((CurrentRoundDTO)currentRoundObj).remainPlayers;
        var eliminatedPlayers = ((CurrentRoundDTO)currentRoundObj).eliminatedPlayers;

        remainPlayersList.Clear();

        foreach (var player in remainPlayers)
        {
            var playerProfileContainer = CreateRemainPlayer(player);
            var eliminatedPlayer = eliminatedPlayers.Find(x => x.id == player.id);
            if (eliminatedPlayer != null)
            {
                AddEliminatedUI(playerProfileContainer);
            }
            remainPlayersList.Add(playerProfileContainer);
        }


    }

    private VisualElement CreateRemainPlayer(PlayerResponse player)
    {
        var playerProfileContainer = new VisualElement();
        playerProfileContainer.AddToClassList("player-profile-container");
        playerProfileContainer.name = player.id;
        var playerVE = playerTemplate.CloneTree();
        playerVE.AddToClassList("player-remain-profile");
        playerVE.Q<Label>().text = player.name;
        playerVE.Q<VisualElement>(className: "player-sprite").style.unityBackgroundImageTintColor = ColorParser.ColorIdToUnityColor(player.color);
        playerProfileContainer.Add(playerVE);
        return playerProfileContainer;
    }

    public void AddHasPowerUI(object playerWithPowerObj)
    {
        var playerWithPowerDict = (Dictionary<string, string>)playerWithPowerObj;
        var playerId = playerWithPowerDict["playerId"];

        var playerHasPower = playerHasPowerTemplate.CloneTree();
        playerHasPower.AddToClassList("has-power");
        playerHasPower.AddToClassList("has-power-initial");

        var playerProfileContainer = remainPlayersList.Q(playerId);
        playerProfileContainer.Add(playerHasPower);
        StartCoroutine(ShowPlayerHasPower(playerHasPower));
    }

    private IEnumerator ShowPlayerHasPower(VisualElement playerHasPower)
    {
        yield return new WaitForSeconds(AnimationTime);
        playerHasPower.RemoveFromClassList("has-power-initial");
    }

    public void RemoveHasPowerUI(object powerUsedObj)
    {
        var powerUsed = powerUsedObj as Dictionary<string, string>;
        var playerId = powerUsed["playerId"];
        var playerProfileContainer  = remainPlayersList.Q(playerId);
        var hasPower = playerProfileContainer.Q(className: "has-power");
        playerProfileContainer.Remove(hasPower);
    }

    public void AddEliminatedUI(VisualElement playerProfileContainer)
    {
        var eliminated = playerEliminatedTemplate.CloneTree();
        eliminated.AddToClassList("eliminated");
        eliminated.AddToClassList("eliminated-initial");
        playerProfileContainer.Add(eliminated);
        StartCoroutine(ShowEliminated(eliminated));

    }

    private IEnumerator ShowEliminated(VisualElement eliminated)
    {
        yield return new WaitForSeconds(AnimationTime);
        eliminated.RemoveFromClassList("eliminated-initial");
    }

}

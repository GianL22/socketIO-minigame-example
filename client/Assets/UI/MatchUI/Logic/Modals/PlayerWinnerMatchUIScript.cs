using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UIElements;

public class PlayerWinnerMatchUIScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public float ShowAndHideAnimationTime = 0.4f;
    public float BaseAnimationTime = 0.2f;

    private const string LOSERS_CONTAINER_NAME = "LosersContainer";
    private const string WINNER_CONTAINER_NAME = "WinnerContainer";
    private const string PLAYER_WINNER_CONTAINER_NAME = "PlayerWinnerConatainer";
    private const string CONTINUE_BUTTON = "Continue";
    private const string MODAL_CLASSNAME = "modal";

    public VisualTreeAsset playerGreenTemplate;
    public VisualTreeAsset playerTemplate;
    private VisualElement root;
    private VisualElement modal;
    private VisualElement losersContainer;
    private VisualElement winnerContainer;
    private VisualElement playerWinnerContainer;
    private Button continueButton;
    private MatchStateScript matchState;

    [Header("Events")]
    public GameEvent PlayerWinnerContinueButtonClicked;


    private void Start()
    {
        root = document.rootVisualElement;

        losersContainer = root.Q(LOSERS_CONTAINER_NAME);
        winnerContainer = root.Q(WINNER_CONTAINER_NAME);
        continueButton = root.Q<Button>(CONTINUE_BUTTON);
        playerWinnerContainer = root.Q(PLAYER_WINNER_CONTAINER_NAME);
        modal = root.Q<VisualElement>(className: MODAL_CLASSNAME);
        matchState = GameObject.FindGameObjectWithTag("MatchState").GetComponent<MatchStateScript>();
        modal.AddToClassList("modal-initial");

        continueButton.RegisterCallback<ClickEvent>((_) => OnContinueButtonClicked());

        root.style.display = DisplayStyle.None;

    }

    public void StartShowModal(object playerWinnerObj)
    {
        var playerWinner = playerWinnerObj as PlayerResponse;
        losersContainer.Clear();
        var eliminatedPlayers = matchState.eliminatedPlayers;

        foreach (var player in matchState.remainPlayers)
        {
            ///TODO: ESTO NO DEBERIA SER ASI
            var isEliminated = eliminatedPlayers.Find(e => e.id == player.id);
            
            if (playerWinner.id != player.id && isEliminated == null)
            {
                eliminatedPlayers.Add(player);
                break;
            }
        }

        foreach (var player in eliminatedPlayers)
        {
            var playerVE = CreateEliminatedPlayer(player);
            StartCoroutine(ShowPlayer(playerVE));
            losersContainer.Add(playerVE);
        }


        //winnerContainer.Clear();
        CreateWinnerPlayer(playerWinner);

        root.style.display = DisplayStyle.Flex;
        Invoke(nameof(ShowModal), ShowAndHideAnimationTime);
    }

    private IEnumerator ShowPlayer(VisualElement playerVE)
    {
        yield return new WaitForSeconds(2);
        playerVE.RemoveFromClassList("player-profile-loser-initial");
    }

    private void ShowModal()
    {
        modal.RemoveFromClassList("modal-initial");
    }

    private VisualElement CreateEliminatedPlayer(PlayerResponse player)
    {
        var playerVE = playerTemplate.CloneTree();
        playerVE.AddToClassList("player-profile-loser");
        playerVE.AddToClassList("player-profile-loser-initial");
        playerVE.Q<Label>().text = player.name;
        playerVE.Q<VisualElement>(className: "player-sprite").style.unityBackgroundImageTintColor = ColorParser.ColorIdToUnityColor(player.color);
        return playerVE;
    }

    private void CreateWinnerPlayer(PlayerResponse playerWinner)
    {

        playerWinnerContainer.AddToClassList("player-winner-container-initial");
        playerWinnerContainer.style.display = DisplayStyle.None;

        playerWinnerContainer.Q<Label>().text = playerWinner.name;
        playerWinnerContainer.Q<VisualElement>(className: "player-sprite").style.unityBackgroundImageTintColor = ColorParser.ColorIdToUnityColor(playerWinner.color);
        
        StartCoroutine(StartShowWinnerPlayer(playerWinnerContainer));

    }

    private IEnumerator StartShowWinnerPlayer(VisualElement container)
    {
        yield return new WaitForSeconds(BaseAnimationTime * 8);
        container.style.display = DisplayStyle.Flex;
        container.RemoveFromClassList("player-winner-container-initial");
    }

    private void OnContinueButtonClicked()
    {
        var roomId = GameObject.FindGameObjectWithTag("RoomState").GetComponent<RoomStateScript>().roomId;
        PlayerWinnerContinueButtonClicked.Raise(roomId);
    }


}

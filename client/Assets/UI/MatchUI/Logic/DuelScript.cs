using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class DuelScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public VisualTreeAsset playerTemplate;
    public VisualTreeAsset caseTemplate;

    [Header("Animation")]
    public float startplayerAnimationTime = 0.2f;
    public float startCaseAnimationTime = 0.4f;

    private const string ROUND_LABEL_NAME = "RoundTitleLabel";
    private const string PLAYER_WITH_CASE = "PlayerInVsWithCase";
    private const string PLAYER_WITHOUT_CASE = "PlayerInVs";

    private Label roundLabel;
    private VisualElement playerInVs;
    private VisualElement playerInVsWithCase;
    private VisualElement caseOwnerContainer;

    private void Start()
    {
        var root = document.rootVisualElement;
        roundLabel = root.Q<Label>(ROUND_LABEL_NAME);
        playerInVsWithCase = root.Q<VisualElement>(PLAYER_WITH_CASE);
        playerInVsWithCase.Clear();
        playerInVs = root.Q<VisualElement>(PLAYER_WITHOUT_CASE);
        playerInVs.Clear();
    }

    public void CreateCase(object caseDataObj)
    {
        var caseData = caseDataObj as string;
        caseOwnerContainer = new VisualElement();
        caseOwnerContainer.AddToClassList("case-owner-container-initial");
        var currentCase = caseTemplate.CloneTree();
        var caseLabel = currentCase.Q<Label>();
        caseLabel.text = caseData;
        currentCase.AddToClassList("case");
        caseOwnerContainer.Add(currentCase);
        playerInVsWithCase.Add(caseOwnerContainer);
        Invoke(nameof(CaseAnimmationStart), startCaseAnimationTime);
    }

    private void CaseAnimmationStart()
    {
        caseOwnerContainer.RemoveFromClassList("case-owner-container-initial");
        caseOwnerContainer.AddToClassList("case-owner-container");
    }

    public void SwapCaseOwner()
    {
        //playerInVs.Add(caseOwnerContainer);
        var distanceX = playerInVsWithCase.worldTransform.GetPosition().x - playerInVs.worldTransform.GetPosition().x;
        var translate = new Translate(-distanceX,0);
        caseOwnerContainer.style.translate = translate;
    }

    public void UpdateRoundLabel(object currentRoundObj)
    {
        var currentRound = (CurrentRoundDTO)currentRoundObj;
        roundLabel.text = "ROUND " + currentRound.roundId;
    }

    public void UpdatePlayerWithoutCase(object player)
    {
        var playerWithoutCase = (PlayerResponse)player;
        playerInVs.Clear();
        var playerVE = playerTemplate.CloneTree();
        playerVE.AddToClassList("player-profile-vs-container-initial");
        playerVE.Q<Label>().text = playerWithoutCase.name;
        playerVE.Q<VisualElement>(className: "player-sprite").style.unityBackgroundImageTintColor = ColorParser.ColorIdToUnityColor(playerWithoutCase.color);
        playerInVs.Add(playerVE);
        StartCoroutine(nameof(StartPlayerAnimation), playerVE);

    }

    public void UpdatePlayerWithCase(object currentRoundObj)
    {
        playerInVs.Clear(); 
        playerInVsWithCase.Clear();
        var playerWithCase = ((CurrentRoundDTO)currentRoundObj).playerWithCase;
        var playerVE = playerTemplate.CloneTree();
        playerVE.AddToClassList("player-profile-vs-container-initial");
        playerVE.Q<Label>().text = playerWithCase.name;
        playerVE.Q<VisualElement>(className: "player-sprite").style.unityBackgroundImageTintColor = ColorParser.ColorIdToUnityColor(playerWithCase.color);
        playerInVsWithCase.Add(playerVE);
        StartCoroutine(nameof(StartPlayerAnimation), playerVE);
    }

    private IEnumerator StartPlayerAnimation(VisualElement playerVE)
    {
        yield return new WaitForSeconds(startplayerAnimationTime);
        playerVE.RemoveFromClassList("player-profile-vs-container-initial");
        playerVE.AddToClassList("player-profile-vs-container");
    }


}

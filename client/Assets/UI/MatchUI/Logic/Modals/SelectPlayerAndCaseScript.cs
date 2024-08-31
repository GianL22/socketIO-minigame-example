using System.Collections;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Xml.Serialization;
using UnityEngine;
using UnityEngine.UIElements;

public class SelectPlayerAndCase : MonoBehaviour
{



    [Header("UI")]
    public UIDocument document;
    public VisualTreeAsset playerTemplate;
    public VisualTreeAsset caseTemplate;
    public float ShowAndHideAnimationTime = 0.4f; 
    private VisualElement root;
    
    private const string SELECT_PLAYER_LIST_NAME = "SelectPlayersList";
    private const string SELECT_CASE_LIST_NAME = "SelectCaseList";
    private const string SELECT_PLAYER_LABEL_NAME = "SelectPlayerLabel";
    private const string SELECT_CASE_LABEL_NAME = "SelectCaseLabel";
    private const string MODAL_CLASSNAME = "modal";

    private VisualElement modal;
    private VisualElement selectPlayerList;
    private VisualElement selectCaseList;
    private Button letsGoButton;
    private Label selectPlayerLabel;
    private Label selectCaseLabel;


    [Header("Events")]
    public GameEvent letsGoButtonClicked;

    [Header("State")]
    public MatchStateScript matchState;

    private string playerIdSelected;
    private string caseIdSelected;

    private void Start()
    {
        root = document.rootVisualElement;
        matchState = GameObject.FindGameObjectWithTag("MatchState").GetComponent<MatchStateScript>();

        selectPlayerList = root.Q<VisualElement>(SELECT_PLAYER_LIST_NAME);
        selectCaseList = root.Q<VisualElement>(SELECT_CASE_LIST_NAME);
        selectPlayerLabel = root.Q<Label>(SELECT_PLAYER_LABEL_NAME);
        selectCaseLabel = root.Q<Label>(SELECT_CASE_LABEL_NAME);
        letsGoButton = root.Q<Button>();
        modal = root.Q(className: MODAL_CLASSNAME);

        letsGoButton.RegisterCallback<ClickEvent>((_) => OnLestGoButtonClicked());
        
        root.style.display = DisplayStyle.None;

        ResetSelections();

    }

    public void HideModal()
    {
        root.style.display = DisplayStyle.None;
        selectCaseLabel.text = "Select case ";
        selectPlayerLabel.text = "Select rival ";
        ResetSelections();
    }

    public void StartShowModal()
    {
        selectPlayerList.Clear();
        var avaiblePlayers = matchState.avaiblePlayersToSelect;
        var remainCasesIds = matchState.remainCasesIds;

        foreach (var player in avaiblePlayers)
        {
            var playerVE = CreateAvaiblePlayer(player);
            selectPlayerList.Add(playerVE);
        }

        selectCaseList.Clear();

        foreach (var caseId in remainCasesIds)
        {
            var caseVE = CreateCase(caseId);
            selectCaseList.Add(caseVE);
        }
        modal.AddToClassList("modal-initial");
        root.style.display = DisplayStyle.Flex;
        
        letsGoButton.parent.SetEnabled(false);

        Invoke(nameof(ShowModal), ShowAndHideAnimationTime);
    }

    private void ShowModal()
    {
        modal.RemoveFromClassList("modal-initial");
    }

    private void OnLestGoButtonClicked()
    {

        var dict = new Dictionary<string, string>()
        {
            {"playerWithoutCaseId" , playerIdSelected},
            {"caseId" , caseIdSelected},
        };
        modal.AddToClassList("modal-initial");
        Invoke(nameof(StartHideModal), ShowAndHideAnimationTime);
        letsGoButtonClicked.Raise(dict);
    }

    private void StartHideModal()
    {
        root.style.display = DisplayStyle.None;
    }

    private VisualElement CreateAvaiblePlayer(PlayerResponse player)
    {
        var playerVE = playerTemplate.CloneTree();
        playerVE.AddToClassList("select-player-profile");
        playerVE.Q<Label>().text = player.name;
        playerVE.Q<VisualElement>(className: "player-sprite").style.unityBackgroundImageTintColor = ColorParser.ColorIdToUnityColor(player.color);
        playerVE.RegisterCallback<ClickEvent>((_) => OnPlayerClicked(player));
        return playerVE;
    }

    private void OnPlayerClicked(PlayerResponse player)
    {
        playerIdSelected = player.id;
        selectPlayerLabel.text = $"Select rival {player.name}";
        CheckDisableLetsGOButton();

    }

    private VisualElement CreateCase(string caseId)
    {
        var caseVE = caseTemplate.CloneTree();
        caseVE.AddToClassList("case");
        caseVE.Q<Label>().text = caseId;
        caseVE.RegisterCallback<ClickEvent>((_) => OnCaseClicked(caseId));
        return caseVE;
    }

    private void OnCaseClicked(string caseId)
    {
        caseIdSelected = caseId;
        selectCaseLabel.text = $"Select case {caseId}";
        CheckDisableLetsGOButton();
    }   

    private void CheckDisableLetsGOButton()
    {
        if (caseIdSelected != null && playerIdSelected != null)
        {
            letsGoButton.parent.SetEnabled(true);
        }
    }

    private void ResetSelections()
    {
        playerIdSelected = null;
        caseIdSelected = null;
    }

}

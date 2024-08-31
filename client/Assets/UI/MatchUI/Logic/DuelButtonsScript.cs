using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class DuelButtonsScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;

    [Header("Animation")]
    public float startButtonAnimationTime = 0.6f;

    private const string SEE_CASE_BUTTON_NAME = "SeeCaseButton";
    private const string KEEP_IT_BUTTON_NAME = "KeepButton";
    private const string STEAL_IT_BUTTON_NAME = "StealButton";
    private const string USE_POWER_BUTTON_NAME = "UsePowerButton";

    private Button seeCaseButton;
    private Button keepItButton;
    private Button stealItButton;
    private Button usePowerButton;

    private List<Button> buttonList = new List<Button>();

    [Header("Events")]
    public GameEvent seeCaseButtonClicked;
    public GameEvent keepItButtonClicked;
    public GameEvent stealItButtonClicked;
    public GameEvent usePowerButtonClicked;

    // Start is called before the first frame update
    void Start()
    {
        var root = document.rootVisualElement;

        seeCaseButton = root.Q<Button>(SEE_CASE_BUTTON_NAME);
        keepItButton = root.Q<Button>(KEEP_IT_BUTTON_NAME);
        stealItButton = root.Q<Button>(STEAL_IT_BUTTON_NAME);
        usePowerButton= root.Q<Button>(USE_POWER_BUTTON_NAME);

        buttonList.Add(seeCaseButton);
        buttonList.Add(keepItButton);
        buttonList.Add(stealItButton);
        buttonList.Add(usePowerButton);

        seeCaseButton.RegisterCallback<ClickEvent>((_) => OnSeeCaseButtonClicked());
        keepItButton.RegisterCallback<ClickEvent>((_) => OnKeepItButtonClicked());
        stealItButton.RegisterCallback<ClickEvent>((_) => OnStealItButtonClicked());
        usePowerButton.RegisterCallback<ClickEvent>((_) => OnUsePowerButtonClicked());

    }

    public void ShowUsePowerButtons(object powerDataObj)
    {
        Debug.Log("Show use power buttons");
        var powerData = powerDataObj as Dictionary<string, string>;
        usePowerButton.parent.AddToClassList("use-power-container-initial");
        var powerName = powerData["powerName"];
        usePowerButton.text = $"Usar Poder\n{powerName}";
            
        Invoke(nameof(StartUsePowerAnimation), startButtonAnimationTime);
    }

    public void StartUsePowerAnimation()
    {
        Debug.Log("Start Show use power buttons");

        usePowerButton.parent.style.display = DisplayStyle.Flex;
        usePowerButton.parent.RemoveFromClassList("use-power-container-initial");
    }

    public void ShowWithoutCaseButtons()
    {
        Debug.Log("Show without case button");
        stealItButton.parent.AddToClassList("steal-button-container-initial");
        keepItButton.parent.AddToClassList("keep-it-container-initial");
        Invoke(nameof(StartShowWithoutButtonsAnimation), startButtonAnimationTime);
    }

    private void StartShowWithoutButtonsAnimation()
    {
        keepItButton.parent.style.display = DisplayStyle.Flex;
        stealItButton.parent.style.display = DisplayStyle.Flex;
        stealItButton.parent.RemoveFromClassList("steal-button-container-initial");
        keepItButton.parent.RemoveFromClassList("keep-it-container-initial");
    }

    public void ShowSeeCaseButtons()
    {
        
        Debug.Log("Show see case button");
        seeCaseButton.parent.AddToClassList("see-case-container-initial");
        Invoke(nameof(StartSeeCaseButtonAnimation), startButtonAnimationTime);

    }

    private void StartSeeCaseButtonAnimation()
    {
        seeCaseButton.parent.style.display = DisplayStyle.Flex;
        seeCaseButton.parent.RemoveFromClassList("see-case-container-initial");
    }

    private void OnUsePowerButtonClicked()
    {
        Debug.Log("OnUsePowerButtonClicked");
        SetAllButtonsDisplayNone();
        usePowerButtonClicked.Raise(null);
    }
    
    private void OnKeepItButtonClicked()
    {
        Debug.Log("OnKeepItButtonClicked");
        SetAllButtonsDisplayNone();
        keepItButtonClicked.Raise(null);
    }

    private void OnStealItButtonClicked()
    {
        Debug.Log("OnStealItButtonClicked");
        SetAllButtonsDisplayNone();
        stealItButtonClicked.Raise(null);
    }

    private void OnSeeCaseButtonClicked()
    {

        seeCaseButtonClicked.Raise(null);
    }


    public void SetAllButtonsDisplayNone()
    {
        Debug.Log("All button display none");
        foreach (var button in buttonList)
        {
            button.parent.style.display = DisplayStyle.None;
        }

    }

}

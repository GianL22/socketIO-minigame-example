using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class MatchMessageScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;

    [Header("Animation")]
    public float StartMessageAnimationTime= 0.6f;

    [Header("Message")]
    public float messageLifeTime = 3f;
    private const string MATCH_MESSAGE_CONTAINER_NAME = "MatchMessageContainer";

    private VisualElement matchMessageContainer;
    private Label matchMessageLabel;

    private void Start()
    {
        var root = document.rootVisualElement;
        matchMessageContainer = root.Q(name: MATCH_MESSAGE_CONTAINER_NAME);
        matchMessageLabel = matchMessageContainer.Q<Label>();
        matchMessageContainer.AddToClassList("match-message-container-initial");

    }

    public void ShowStoleCaseMmessage(object stealDataObj)
    {
        var stealData = stealDataObj as Dictionary<string,string>;
        matchMessageLabel.text = $"{stealData["playerName"]} STEAL THE CASE!";
        Invoke(nameof(StartShowMessageAnimation), StartMessageAnimationTime);
    }

    public void ShowKeepCaseMmessage(object keepDataObj)
    {
        var keepData = keepDataObj as Dictionary<string, string>;
        matchMessageLabel.text = $"{keepData["playerName"]} KEEP HIS CASE!";
        Invoke(nameof(StartShowMessageAnimation), StartMessageAnimationTime);

    }

    private void StartShowMessageAnimation()
    {
        matchMessageContainer.style.display = DisplayStyle.Flex;
        matchMessageContainer.RemoveFromClassList("match-message-container-initial");
        Invoke(nameof(StartHideMessageAnimation), messageLifeTime);
    }

    private void StartHideMessageAnimation()
    {
        matchMessageContainer.AddToClassList("match-message-container-initial");
        Invoke(nameof(HideMessage), StartMessageAnimationTime);
    }
    public void HideMessage()
    {
        matchMessageContainer.style.display = DisplayStyle.None;
        matchMessageContainer.AddToClassList("match-message-container-initial");
    }
}

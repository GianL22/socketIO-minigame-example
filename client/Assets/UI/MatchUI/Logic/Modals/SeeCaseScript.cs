using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UIElements;

public class SeeCaseScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public float StartShowMessageAnimationTime = 0.6f;
    public float ShowAndHideAnimation = 0.4f;

    private const string MODAL_CLASSNAME = "modal";
    private const string SAFED_MESSAGE_NAME = "SafedMessage";
    private const string ELIMINATED_MESSAGEL_NAME = "EliminatedMessage";
    private const string CASE_CLASSNAME = "case";

    private VisualElement root;
    private VisualElement modal;   
    private VisualElement safedMessage;
    private VisualElement eliminatedMessage;
    private Label caseLabel;
    private Button okButton;

    private void Start()
    {
        root = document.rootVisualElement;
        root.style.display = DisplayStyle.None;
        safedMessage = root.Q(SAFED_MESSAGE_NAME);
        eliminatedMessage = root.Q(ELIMINATED_MESSAGEL_NAME);
        var caseContainer = root.Q<VisualElement>(className: CASE_CLASSNAME);
        caseLabel = caseContainer.Q<Label>();
        okButton = root.Q<Button>();
        modal = root.Q(className: MODAL_CLASSNAME);
        okButton.RegisterCallback<ClickEvent>((_) => StartHideModalAnimation());
    }

    public void StartShowModal(object currentCaseObj)
    {
        var currentCase = currentCaseObj as CurrentCase;
        if ( currentCase.isSafe)
        {
            safedMessage.AddToClassList("safed-message-initial");
            Invoke(nameof(StartShowSafedMessage), StartShowMessageAnimationTime);
        }
        else
        {
            eliminatedMessage.AddToClassList("eliminated-message-initial");
            Invoke(nameof(StartShowEliminatedMessage), StartShowMessageAnimationTime);
        }
        caseLabel.text = currentCase.caseId;
        modal.AddToClassList("modal-initial");
        root.style.display = DisplayStyle.Flex;
        Invoke(nameof(ShowModal), ShowAndHideAnimation);
    }

    public void ShowModal()
    {
        modal.RemoveFromClassList("modal-initial");

    }

    private void StartShowSafedMessage()
    {
        safedMessage.style.display = DisplayStyle.Flex;
        safedMessage.RemoveFromClassList("safed-message-initial");
    }

    private void StartShowEliminatedMessage()
    {
        eliminatedMessage.style.display = DisplayStyle.Flex;
        eliminatedMessage.RemoveFromClassList("eliminated-message-initial");
    }

    private void StartHideModalAnimation()
    {
        modal.AddToClassList("modal-initial");
        Invoke(nameof(HideModal), ShowAndHideAnimation);
    }

    private void HideModal()
    {
        root.style.display = DisplayStyle.None;
        eliminatedMessage.style.display = DisplayStyle.None;
        safedMessage.style.display = DisplayStyle.None;
    }
}

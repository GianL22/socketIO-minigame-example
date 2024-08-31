using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using Unity.VisualScripting.FullSerializer;
using UnityEngine;
using UnityEngine.UIElements;

public class OpenCaseScript : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public float CaseShakeAnimetionTime = 2f;
    public float CaseShakeAnimetionChangeTime = 0.05f;
    public float CaseShakeDegrees = 15f;
    public float ShowAndHideAnimationTime = 0.4f;
    public bool isActiveShakeAnimation = true;

    private const string CASE_CONTAINER_NAME = "CaseContainer";
    private const string SAFED_MESSAGE_NAME = "SafedMessage";
    private const string ELIMINATED_MESSAGE_NAME = "EliminatedMessage";
    private const string OPEN_CASE_MESSAGE_LABEL = "OpenCaseMessageLabel";
    private const string CONTINUE_MESSAGE_LABEL_NAME = "ContinueMessage";
    private const string MODAL_CLASSNAME = "modal";

    private VisualElement root;
    private VisualElement modal;
    private VisualElement caseContainer;
    private VisualElement SafedMessge;
    private VisualElement EliminatedMessage;
    private Label openCaseMessageLabel;
    private Label caseLabel;
    private VisualElement continueMessage;
    private Button continueButton;
    private MatchStateScript matchState;

    [Header("Events")]
    public GameEvent continueButtonClicked;


    private void Start()
    {
        root = document.rootVisualElement;
        caseContainer = root.Q(CASE_CONTAINER_NAME);
        SafedMessge = root.Q(SAFED_MESSAGE_NAME);
        EliminatedMessage = root.Q(ELIMINATED_MESSAGE_NAME);
        openCaseMessageLabel = root.Q<Label>(OPEN_CASE_MESSAGE_LABEL);
        continueMessage = root.Q(CONTINUE_MESSAGE_LABEL_NAME);
        continueButton = root.Q<Button>();
        caseLabel = caseContainer.Q<Label>();
        modal = root.Q(className: MODAL_CLASSNAME);

        continueMessage.style.display = DisplayStyle.None;
        continueButton.parent.style.display = DisplayStyle.None;

        matchState = GameObject.FindGameObjectWithTag("MatchState").GetComponent<MatchStateScript>();
        continueButton.RegisterCallback<ClickEvent>((_) => OnContinueButtonClicked());

    }

    public void StartShowModal(object caseOpenedObj)
    {

        var caseOpenedDict = caseOpenedObj as Dictionary<string, string>;
        var isSafe = caseOpenedDict["isSafe"];
        var caseId = caseOpenedDict["caseId"];
        isActiveShakeAnimation = true;
        //XDDDDDDD
        if (isSafe == "true")
        {
            SafedMessge.AddToClassList("safed-message-initial");
            Invoke(nameof(StartShowSafe), CaseShakeAnimetionTime);
        }
        else
        {
            EliminatedMessage.AddToClassList("eliminated-message-initial");
            Invoke(nameof(StartShowEliminate), CaseShakeAnimetionTime);
        }
        caseLabel.text = caseId;
        modal.AddToClassList("modal-initial");
        root.style.display = DisplayStyle.Flex;
        caseContainer.style.display = DisplayStyle.Flex;
        StartCoroutine(DoCaseShakeAnimation());
        Invoke(nameof(ShowModal), ShowAndHideAnimationTime);

    }

    private void ShowModal()
    {
        modal.RemoveFromClassList("modal-initial");
    }

    public void StartHideModal()
    {
        modal.AddToClassList("modal-initial");
        Invoke(nameof(HideModal), ShowAndHideAnimationTime);
    }

    private void HideModal()
    {
        root.style.display = DisplayStyle.None;
        continueMessage.style.display = DisplayStyle.None;
        continueButton.parent.style.display = DisplayStyle.None;
        SafedMessge.style.display = DisplayStyle.None;
        EliminatedMessage.style.display = DisplayStyle.None;

    }

    private IEnumerator DoCaseShakeAnimation()
    {
        var timer = CaseShakeAnimetionTime;
        var sign = 1;
        while (isActiveShakeAnimation)
        {
            sign *= -1;
            caseContainer.transform.rotation = Quaternion.Euler(0, 0, CaseShakeDegrees * sign);
            yield return new WaitForSeconds(CaseShakeAnimetionChangeTime);
            timer -= Time.deltaTime;
        }
        caseContainer.transform.rotation = Quaternion.Euler(0, 0, 0);
        caseContainer.style.display = DisplayStyle.None;
    }

    private void StartShowSafe()
    {
        SafedMessge.style.display = DisplayStyle.Flex;
        isActiveShakeAnimation = false;
        SafedMessge.RemoveFromClassList("safed-message-initial");
        openCaseMessageLabel.text = $"{matchState.playerWithCase.name} IS SAFED";
        ShowBottomContent();
    }

    private void StartShowEliminate()
    {
        EliminatedMessage.style.display = DisplayStyle.Flex;
        isActiveShakeAnimation = false;
        EliminatedMessage.RemoveFromClassList("eliminated-message-initial");
        openCaseMessageLabel.text = $"{matchState.playerWithCase.name} IS ELIMINATED";
        ShowBottomContent();
    }

    private void ShowBottomContent()
    {
        if (PlayerStateScript.id.ToString() == matchState.playerWithoutCase.id)
        {
            continueButton.parent.style.display = DisplayStyle.Flex;
            return;
        }

        continueMessage.style.display = DisplayStyle.Flex;

    }

    private void OnContinueButtonClicked()
    {
        continueButtonClicked.Raise(null);
        HideModal();
    }

}

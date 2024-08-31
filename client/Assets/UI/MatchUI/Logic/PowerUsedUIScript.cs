using System.Collections;
using System.Collections.Generic;
using UnityEngine;  
using UnityEngine.UIElements;

public class PowerUsedUI : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public bool activeAnimation = false;
    public float ShowAndHideModalTime = 0.4f;
    public float ShowTime = 4f;

    private const string MODAL_CLASSNAME = "modal";
    private const string POWER_MESSAGE_LABEL_CLASSNAME = "PowerMessageLabel";

    private VisualElement root;
    private VisualElement modal;
    private Label powerUsedLabel;

    private void Start()
    {
        root = document.rootVisualElement;
        modal = root.Q(className: MODAL_CLASSNAME);
        powerUsedLabel = root.Q<Label>(POWER_MESSAGE_LABEL_CLASSNAME);

        root.style.display = DisplayStyle.None; 
    }

    private string ParsePowerToLabelText(Dictionary<string, string> powerUsed)
    {
        var ownerName = powerUsed["playerName"];
        var power = powerUsed["powerName"];
        if (power == "changeIsSafeUsed")
        {
            return $"{ownerName} CAMBIO EL CONTENIEDO DEL MALETIN... O NO...";
        }
        if (power == "currentCasePeaked")
        {
            return $"{ownerName} SABE QUE CONTIENE EL MALETIN!";
        }
        if (power == "stealCasePowerUsed")
        {
            return $"{ownerName} ROBO EL MALETIN";
        }
        return "ALGO OCURRIO MAL";
    
    }

    public void StartShowModal(object powerUsedObj)
    {

        var powerUsed = powerUsedObj as Dictionary<string, string>;
        powerUsedLabel.text = ParsePowerToLabelText(powerUsed);

        modal.AddToClassList("modal-initial");
        
        root.style.display = DisplayStyle.Flex;
        Invoke(nameof(ShowModal), ShowAndHideModalTime);
    }

    private void ShowModal()
    {
        modal.RemoveFromClassList("modal-initial");
        Invoke(nameof(StartHideModal), ShowTime);
    }

    private void StartHideModal()
    {
        modal.AddToClassList("modal-initial");
        Invoke(nameof(HideModal), ShowAndHideModalTime);
    }

    private void HideModal()
    {
        modal.RemoveFromClassList("modal-initial");
        root.style.display = DisplayStyle.None;
    }

    

}

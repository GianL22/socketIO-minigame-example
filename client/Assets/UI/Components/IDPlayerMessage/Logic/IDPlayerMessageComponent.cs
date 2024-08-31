using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class IDPlayerMessageComponent : MonoBehaviour
{
    [Header("UI")]
    public UIDocument document;
    public Label playerIdLabel;
    public GameObject player;
    private const string PLAYERID_LABEL_NAME = "IdPlayer";
    private string playerId;
    private void Start()
    {
        playerId = PlayerStateScript.id.ToString();
        playerIdLabel = document.rootVisualElement.Q<Label>(name: PLAYERID_LABEL_NAME);
        playerIdLabel.text = playerId;
    }
}

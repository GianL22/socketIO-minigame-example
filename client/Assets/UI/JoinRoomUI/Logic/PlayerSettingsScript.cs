using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UIElements;

public class PlayerSettingsScript : MonoBehaviour
{

    [Header("UI")]
    public UIDocument document;
    private List<Color> colors = ColorParser.PLAYER_COLOR;
    private VisualElement root;
    

    private const string PLAYER_NAME_TEXTFIELD_NAME = "PlayerNameInput";
    private const string PLAYER_NAME_LABEL_NAME = "NameCard";
    private const string COLORS_CONTAINER_NAME = "ColorsContainer";
    private const string COLOR_BUTTON_CLASSNAME = "color-button";
    private const string PLAYER_SPRITE_CLASSNAME = "player-sprite";

    private TextField playerNameTextField;
    private VisualElement colorsContainer;
    private VisualElement playerSpriteVisualElement;
    private Label nameCardLabel;

    [Header("Events")]
    public GameEvent ColorButtonClicked;
    public GameEvent playerNameChanged;

    private void Start()
    {
        root = document.rootVisualElement;

        playerNameTextField = root.Q<TextField>(PLAYER_NAME_TEXTFIELD_NAME);
        colorsContainer = root.Q<VisualElement>(COLORS_CONTAINER_NAME);
        playerSpriteVisualElement = root.Q<VisualElement>(className: PLAYER_SPRITE_CLASSNAME);
        nameCardLabel = root.Q<Label>(PLAYER_NAME_LABEL_NAME);

        foreach (var myColor in colors)
        {
            var button = new Button();
            button.text = string.Empty;
            button.AddToClassList(COLOR_BUTTON_CLASSNAME);
            button.style.backgroundColor = myColor;
            button.RegisterCallback<ClickEvent>((_) => OnColorButtonClicked(myColor));
            colorsContainer.Add(button);

        }
        playerNameTextField.value = "Name";
        playerNameTextField.RegisterCallback<ChangeEvent<string>>((evt) => OnPlayerNameTextFieldChanged(evt.newValue));
    }
    public void EnableAll(object obj)
    {
        SetEnabledAll(true);
    }
    public void DisableAll(object obj)
    {
        SetEnabledAll(false);
    }
    private void SetEnabledAll(bool enabled)
    {
        playerNameTextField.SetEnabled(enabled);
    }

    private void OnPlayerNameTextFieldChanged(string newValue)
    {
        nameCardLabel.text = newValue;
        playerNameChanged.Raise(newValue);
    }

    private void OnColorButtonClicked(Color color)
    {
        playerSpriteVisualElement.style.unityBackgroundImageTintColor = color;
        ColorButtonClicked.Raise(color);
    }
}

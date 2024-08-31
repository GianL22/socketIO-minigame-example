using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ColorParser
{

    public static List<Color> PLAYER_COLOR = new List<Color>()
    {
        new Color(1,1,1,255),
        new Color(0.827450991f,0.785431743f,0.329411745f,255),
        new Color(0.827450991f,0.438931555f,0.329411745f,255),
        new Color(0.827450991f,0.329411745f,0.62079227f,255),
        new Color(0.464654624f,0.329411745f,0.827450991f,255),
        new Color(0.329411745f,0.814508379f,0.827450991f,255),
        new Color(0.9924528f,0.317640543f,0.170402259f,255),
        new Color(0.467500806f,0.826415062f,0.329006702f,255)

    };

    public static Color ColorIdToUnityColor(string colorId)
    {
        var id = int.Parse(colorId);
        if (id < 0) return PLAYER_COLOR[0];
        return PLAYER_COLOR[id];
    }

    public static string UnityColorToColorId(Color unityColor)
    {
        var index = PLAYER_COLOR.IndexOf(unityColor).ToString();
        if (index != "-1")
        {
            return index; 
        }
        return "0";
    }
}

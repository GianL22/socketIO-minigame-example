using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class PlayerStateScript : MonoBehaviour
{
    public static Guid id = Guid.NewGuid();
    public string nickname = string.Empty;
    public Color color = ColorParser.PLAYER_COLOR[0];

    public void ChangeColor(object color)
    {
        this.color = (Color)color;
    }

    public void ChangeNickName(object nickname)
    {
        this.nickname = (string)nickname;
    }

    public object GetState()
    {
        return new
        {
            id,
            nickname,
            color
        };
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RoomStateScript : MonoBehaviour
{
    class Player
    {

        public string playerId;
        public string playerName; 
        public Color playerColor;
        public Player(string playerId, string playerName, Color playerColor)
        {
            this.playerId = playerId;
            this.playerName = playerName;
            this.playerColor = playerColor;
        }
    }
    //TODO: Encapsular
    public string roomId;
    private List<Player> players = new List<Player>();
    public bool isCurrentClientOwner = false;

    public void SetRoomId(object roomId)
    {
        this.roomId = (string) roomId;
    }

    public void SetCurrentClientOwner(bool isOwner)
    {
        isCurrentClientOwner = isOwner;
    }

    public void ResetState()
    {
        roomId = null;
        players = new List<Player>();
        isCurrentClientOwner = false;
    }

    public void UpdateListPlayers(object playersObjs)
    {
        var newPlayers = (Dictionary<string, string>[]) playersObjs;
        players = new List<Player>();
        foreach (var p in newPlayers)
        {
            players.Add(new Player(p["playerId"], p["playerName"], ColorParser.ColorIdToUnityColor(p["playerColor"])));
        }
    }

}

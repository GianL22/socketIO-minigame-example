using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MatchStateScript : MonoBehaviour
{
    [Header("State")]
    public static string id;
    public string roundId;
    public List<string> remainCasesIds;
    public PlayerResponse playerWithCase;
    public PlayerResponse playerWithoutCase = null;
    public List<PlayerResponse> remainPlayers;
    public List<PlayerResponse> avaiblePlayersToSelect;
    public List<PlayerResponse> safedPlayers;
    public List<PlayerResponse> eliminatedPlayers;

    [Header("Power")]
    public static string currentPowerId;
    
    [Header("Events")]
    public GameEvent currentPlayerSelectedAsWithCase;
    public GameEvent currentPlayerSelectedAsWithoutCase;

    public void UpdateCurrentRoundState(object CurrentRoundObj)
    {
        
        var currentRound = (CurrentRoundDTO)CurrentRoundObj;
        id = currentRound.matchId;
        roundId = currentRound.roundId;
        remainCasesIds = currentRound.remainCasesIds;
        playerWithCase = currentRound.playerWithCase;
        remainPlayers = currentRound.remainPlayers;
        safedPlayers = currentRound.safedPlayers;
        eliminatedPlayers = currentRound.eliminatedPlayers;
        avaiblePlayersToSelect = currentRound.avaiblePlayersToSelect;
        Debug.Log("Deberia llamarse el evento de currentplayerSelectedAsWithCase");
        if (PlayerStateScript.id.ToString() == playerWithCase.id)
        {
            Debug.Log("Se va a llamar el evento de withcase");
            currentPlayerSelectedAsWithCase.Raise(null);
        }
    }

    public void UpdatePlayerWithCase(object playerWithCaseObj)
    {
        var playerWithCaseDict = playerWithCaseObj as Dictionary<string,string>;
        this.playerWithCase = new PlayerResponse(playerWithCaseDict["playerId"], playerWithCaseDict["playerName"], playerWithCaseDict["playerColor"]);
    }

    public void UpdatePlayerWithoutCase(object playerWithoutCaseObj)
    {
        var newPlayerWithoutCase = (PlayerResponse)playerWithoutCaseObj;
        this.playerWithoutCase = newPlayerWithoutCase;
        if (PlayerStateScript.id.ToString() == playerWithoutCase.id)
        {
            currentPlayerSelectedAsWithoutCase.Raise(null);
        }
    }

    public void ChangePowerId(object powerDataObject)
    {
        var powerData = (Dictionary<string,string>) powerDataObject;
        currentPowerId = powerData["powerId"];
    }


}

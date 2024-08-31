using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Composition.Primitives;



public class CurrentCase
{
    //Fuck u encapsulation
    public string caseId;
    public bool isSafe;

    public CurrentCase(string caseId, bool isSafe)
    {
        this.caseId = caseId;
        this.isSafe= isSafe;
    }

}
public class PlayerResponse
{
    //Fuck u encapsulation
    public string id;
    public string name;
    public string color;

    public PlayerResponse(string id, string name, string color)
    {
        this.id = id;
        this.name = name;
        this.color = color;
    }

}

//export interface GetCurrentRoundResponse
//{
//    roundId : string,
//    playerWithCaseId : string,
//    remainPlayers : PlayerResponse[],
//    safedPlayers : PlayerResponse[],
//    eliminatedPlayers : PlayerResponse[],
//}

public class CurrentRoundDTO
{
    public string roundId;
    public string matchId;
    public List<string> remainCasesIds;
    public PlayerResponse playerWithCase;
    public List<PlayerResponse> remainPlayers;
    public List<PlayerResponse> safedPlayers;
    public List<PlayerResponse> eliminatedPlayers;
    public List<PlayerResponse> avaiblePlayersToSelect;

    public CurrentRoundDTO(
        string matchId,
        string roundId,
        List<string> remainCasesIds,
        PlayerResponse playerWithCase,
        List<PlayerResponse> remainPlayers,
        List<PlayerResponse> safedPlayers,
        List<PlayerResponse> eliminatedPlayers,
        List<PlayerResponse> avaiblePlayersToSelect
    )
    {
        this.matchId = matchId;
        this.roundId = roundId;
        this.remainCasesIds = remainCasesIds;
        this.playerWithCase = playerWithCase;
        this.remainPlayers = remainPlayers;
        this.safedPlayers = safedPlayers;
        this.eliminatedPlayers = eliminatedPlayers;
        this.avaiblePlayersToSelect = avaiblePlayersToSelect;
    }

}

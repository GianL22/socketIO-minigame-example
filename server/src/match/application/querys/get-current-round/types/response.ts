
export interface PlayerResponse{
    id : string, 
    name : string,
    color : string,
}

export interface GetCurrentRoundResponse{
    roundId : string,
    remainCasesIds : string[],
    currentCaseId : string,
    playerWithCase : PlayerResponse,
    playerWithoutCase ?: PlayerResponse,
    avaiblePlayersToSelect : PlayerResponse[],
    remainPlayers : PlayerResponse[],
    safedPlayers : PlayerResponse[],
    eliminatedPlayers : PlayerResponse[],
}
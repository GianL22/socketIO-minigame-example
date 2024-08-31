import { Entity } from "../../core/domain/entity";
import { Player } from "../../room/domain/player";
import { Case } from "./case";

//TODO : Mejorar el modelado del dominio

export type RoundStaus = "waiting" | "keepit" | "stealit" | "duel_finished"

export class Round extends Entity{
    
    private _currentCase : Case
    private _status : RoundStaus

    private constructor(
        id : string,
        private _withCase : Player,
        private _remainCases : Case[],
        private _safed : Player[] = [],
        private _withoutCase ?: Player,
    ){
        super(id)
        //TODO: cambiar
        this._currentCase = _remainCases[0]
        this._status = "waiting"
    }

    get safed(){
        return this._safed
    }

    get withCase(){
        return this._withCase
    }

    get withoutCase(){
        return this._withoutCase
    }

    get status(){
        return this._status
    }

    get remainCases(){
        return this._remainCases
    }

    get currentCase(){
        return this._currentCase
    }

    changeStatus(status : RoundStaus){
        this._status = status
    }

    openCurrentCase(){
        this._remainCases = this.remainCases.filter(c => c.id != this.currentCase.id)
        return this.currentCase
    }
    //????
    selectWithoutCase(player : Player){
        this._withoutCase = player
    }

    safePlayer(player : Player){
        this._safed.push(player)
    }

    changeWithCase(player : Player){
        this._withCase = player
    }

    removePlayerWithoutCase(){
        //Esto obviamente no deberia ser asi
        this._withoutCase = undefined
    }

    changeCases(cases : Case[]){
        this._remainCases = cases
    }

    toggleIsSafe(){
        this._currentCase.changeSafe()
    }

    changeCurrentCase(caseIdToChange : string){
        const caseToChange = this._remainCases.find(c => c.id == caseIdToChange) 
        if (!caseToChange) throw new Error("caseId provided not found")
        this._currentCase = caseToChange;
    }

    isAllRemainCasesSafe(){
        const notSafeCase = this.remainCases.find(c => c.isSafe !== true)
        if (notSafeCase) return false
        return true
    }
    isAllRemainCasesNotSafe(){
        const safeCase = this.remainCases.find(c => c.isSafe === true)
        if (safeCase) return false
        return true
    }

    static initialRound(playerWithCase : Player, cases : Case[]) : Round{
        return new Round("0", playerWithCase, cases)
    }

    static nextRound(currentRound : Round, firstPlayerWithCase : Player, cases : Case[]) : Round{
        const nextRoundId = String(Number(currentRound.id) + 1)
        return new Round(nextRoundId,  firstPlayerWithCase,  cases, [])
    }

}
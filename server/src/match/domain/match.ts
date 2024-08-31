import { Entity } from "../../core/domain/entity";
import { Player } from '../../room/domain/player';
import { Case } from "./case";
import { currentCaseChanged } from "./events/current-case-changed.event";
import { matchStarted } from "./events/match-started.event";
import { playerEliminated } from './events/player-eliminated.event';
import { Round, RoundStaus } from './round';
import { playerWithoutCaseSelected } from './events/player-without-case-selected.event';
import { caseStole } from "./events/case-stole.event";
import { caseKept } from "./events/case-kept.event";
import { playerSafed } from "./events/player-safed.event";
import { matchFinished } from "./events/match-finished.event";
import { roundFinished } from "./events/round-finished.event";
import { duelFinished } from "./events/duel-finished.event";
import { playerWithCaseChanged } from "./events/player-with-case-changed.event";
import { currentRoundChanged } from "./events/current-round-changed.event";

//TODO : Mejorar el modelado del dominio

export class Match extends Entity{

    private currentRound : Round

    constructor(
        id : string,
        firstPlayerWithCase : Player,
        cases : Case[],
        private _roomId : string,
        private _remain : Player[] = [],
        private _eliminated : Player[] = [],
    ){
        super(id)
        this.currentRound = Round.initialRound(firstPlayerWithCase, cases)
        
        this.publish(matchStarted(this._id, this._roomId))
    }

    get playerWithCase(){
        return this.currentRound.withCase
    }

    get playerWithoutCase() : Player{
        return this.currentRound.withoutCase!
    }

    get roundId(){
        return this.currentRound.id
    }

    get roomId() {
        return this._roomId
    }

    get remain(){
        return this._remain
    }

    get roundRemainCases(){
        return this.currentRound.remainCases
    }

    get eliminatedPlayers(){
        return this._eliminated
    }

    get safedPlayers(){
        return this.currentRound.safed
    }

    get currentCase(){
        return this.currentRound.currentCase;
    }

    toggleCurrentCaseIsSafe(){
        this.currentRound.toggleIsSafe()
    }

    openRoundCurrentCase(){
        return this.currentRound.openCurrentCase()
    }

    changeRoundCases(cases : Case[]){
        this.currentRound.changeCases(cases)
    }

    changePlayerWithCase(player : Player){
        this.currentRound.changeWithCase(player)
        this.publish(playerWithCaseChanged(this._id, player.id))
    }
    
    stealCase(){
        this.changeRoundStatus("stealit")
        this.publish(caseStole(this.roomId, this.id, this.currentCase.id, this.playerWithCase.id))
    }   

    swapPlayers(){
        const tempPlayer = this.playerWithCase
        this.currentRound.changeWithCase(this.playerWithoutCase)
        this.currentRound.selectWithoutCase(tempPlayer)
    }

    keepCase(){
        this.changeRoundStatus("keepit")
        this.publish(caseKept(this.roomId, this.id, this.currentCase.id, this.playerWithCase.id))
    }   

    finishRoundStatus(){
        this.currentRound.changeStatus("duel_finished")
    }

    changeRoundStatus(status : RoundStaus){
        this.currentRound.changeStatus(status)
    }

    roundSafePlayer(player : Player){
        const isPlayerInReamin = this._remain.find((p) => p.id != player.id)
        if ( !isPlayerInReamin ) throw new Error("Player eliminated is not in remain");

        this.currentRound.safePlayer(player)
        this.publish(playerSafed(this._id,player.id))
    }

    eliminatePlayer(player : Player){
        
        const isPlayerInReamin = this._remain.find((p) => p.id != player.id)
        if ( !isPlayerInReamin ) throw new Error("Player eliminated is not in remain");
        this._eliminated.push(player)
        this.publish(playerEliminated(this._id, player.id))
    }

    checkMatchStatus(){
        const remainsNumber = this.remain.length
        const eliminatedNumber = this._eliminated.length
        const safedNumber = this.safedPlayers.length

        //TODO : Mover esto a un servicio de dominio
        if (this.currentRound.isAllRemainCasesSafe()) { 
            if (remainsNumber - eliminatedNumber === 1){
                const winnerPlayer = this._remain.find(p => {
                    const isEliminated = this.eliminatedPlayers.find( pe => pe.id == p.id)
                    if (!isEliminated) return true
                    return false
                })
                this.publish(matchFinished(this.roomId, this._id, winnerPlayer!.id, winnerPlayer!.name, winnerPlayer!.color))
                return
            }
            this.remain.forEach((playerRemain) => {
                const isEliminated =this.eliminatedPlayers.find(p => p.id == playerRemain.id)
                if (isEliminated) return
                this.currentRound.safePlayer(playerRemain)                
            })  
            this.publish(roundFinished(this.roomId, this._id))
            return 
        }
        if (this.currentRound.isAllRemainCasesNotSafe()) { 
            if (this.safedPlayers.length == 1){
                const winnerPlayer = this.safedPlayers[0]
                this.remain.forEach((p) => {
                    const isEliminated = this.eliminatedPlayers.find( pe => pe.id == p.id)
                    if ( p.id != winnerPlayer.id && !isEliminated) this._eliminated.push(p)
                })
                this.publish(matchFinished(this.roomId, this._id, winnerPlayer.id, winnerPlayer!.name, winnerPlayer.color))
                return 
            }
            this.remain.forEach((playerRemain) => {
                const isSafed = this.currentRound.safed.find(p => p.id == playerRemain.id)
                if (isSafed) return
                this._eliminated.push(playerRemain)
                
            })           
            this.publish(roundFinished(this.roomId, this._id))
            return 
        }
        this.publish(duelFinished(this.roomId, this._id))

    }

    selectRoundPlayerWithoutCase(playerId : string){
        const player = this.remain.find((p) => p.id == playerId)
        if ( !player ) throw new Error("Player is not in remain")
        this.currentRound.selectWithoutCase(player)
        this.publish(playerWithoutCaseSelected(this.roomId, this._id, playerId))
    }

    selectCase(caseIdSelected : string){
        this.currentRound.changeCurrentCase(caseIdSelected);
        this.publish(currentCaseChanged(this.roomId, this.id, caseIdSelected))
    }

    passToNextRun( firstPlayerWithCase : Player, cases : Case[]){
        this.currentRound = Round.nextRound(this.currentRound, firstPlayerWithCase, cases)
        this.publish(currentRoundChanged(this.roomId, this.id))
    }

}
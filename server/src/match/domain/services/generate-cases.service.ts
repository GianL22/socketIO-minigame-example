import { Player } from "../../../room/domain/player";
import { Case } from "../case";

export class GenerateMatchSafeCases{


    generate(remainPlayers : Player[]) : Case[]{
        const numberRemain = remainPlayers.length
        
        let numberSafeCases = Math.floor( numberRemain / 2 )
        const numberRemainPlayers = numberRemain
        const cases = []

        for (let i = 0; i < numberRemainPlayers; i++) {
            cases.push( new Case((i + 1).toString(), false))
        }

        while (numberSafeCases > 0) {
            //TODO: Los randons no deben estar en dominio
            const possibleSafeCase = Math.floor(Math.random() * (numberRemainPlayers))
            if ( !cases[possibleSafeCase].isSafe ) {
                cases[possibleSafeCase].changeSafe()
                numberSafeCases--
            }
        }

        

        return cases

    }
}
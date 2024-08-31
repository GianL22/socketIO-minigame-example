import { createServer } from "http";
import { Server } from "socket.io";
import express from "express"
import cors from "cors"
import { JoinPlayerToRoomController } from '../../room/infraestructure/socket-controllers/client-to-server/add-player/join-player.controller';
import { JoinPlayerToRoomDTO  } from "../../room/application/commands/join-player/types/dto";
import { roomRouter } from "../../room/infraestructure/router/room.router";
import { PlayerJoinedEventListener } from '../../room/infraestructure/event-listeners/player-joined.listener';
import { PLAYER_JOINED, playerJoined } from "../../room/domain/events/player-joined.event";
import { eventMediator } from '../infraestructure/event-mediator/event-mediator';
import { SocketIO } from "../infraestructure/socketio/socketio.socket";
import { LeavePlayerFromRoomController } from "../../room/infraestructure/socket-controllers/client-to-server/leave-player/leave-player.controller";
import { PlayerLeavedEventListener } from "../../room/infraestructure/event-listeners/player-leaved.listener";
import { PLAYER_LEAVED } from "../../room/domain/events/player-leaved.event";
import { ROOM_EMPTIED, roomEmptied } from "../../room/domain/events/room-emptied.event";
import { RoomEmptiedEventListener } from "../../room/infraestructure/event-listeners/room-emptied.listener";
import { StartMatchController } from "../../match/infraestructure/socket-controllers/client-to-server/start-match/start-match.controller";
import { MatchStartedEventListener } from "../../match/infraestructure/event-listeners/match-started.listener";
import { MATCH_STARTED } from "../../match/domain/events/match-started.event";
import { Controller } from '../infraestructure/controller/controller';
import { SelectPlayerWithoutCaseController } from "../../match/infraestructure/socket-controllers/client-to-server/select-player-without-case/select-player-without-case.controller";
import { SelectCaseController } from "../../match/infraestructure/socket-controllers/client-to-server/select-case/select-case.controller";
import { currentCaseChanged, CURRENT_CASE_CHANGED } from '../../match/domain/events/current-case-changed.event';
import { CurrentCaseChangedEventListener } from "../../match/infraestructure/event-listeners/case-selected.listener";
import { PlayerWithoutCaseSelectedEventListener } from "../../match/infraestructure/event-listeners/player-without-case-selected.listner";
import { PLAYER_WITHOUT_CASE_SELECTED } from "../../match/domain/events/player-without-case-selected.event";
import { GetCurrentCaseController } from "../../match/infraestructure/socket-controllers/client-to-server/get-current-case/get-current-case.controller";
import { KeepCaseController } from '../../match/infraestructure/socket-controllers/client-to-server/keep-case/keep-case.controller';
import { StealCaseController } from "../../match/infraestructure/socket-controllers/client-to-server/steal-case/steal-case.controller";
import { CaseKeptEventListener } from "../../match/infraestructure/event-listeners/case-kept.listener";
import { CASE_STOLE } from "../../match/domain/events/case-stole.event";
import { CASE_KEPT } from "../../match/domain/events/case-kept.event";
import { CaseStoleEventListener } from "../../match/infraestructure/event-listeners/case-stole.listener";
import { OpenCurrentCaseController } from "../../match/infraestructure/socket-controllers/client-to-server/open-current-case/open-current-case.controller";
import { FinishDuelController } from '../../match/infraestructure/socket-controllers/client-to-server/finish-duel/finish-duel.controller';
import { DuelFinishedEventListener } from "../../match/infraestructure/event-listeners/duel-finished.listener";
import { DUEL_FINISHED } from '../../match/domain/events/duel-finished.event';
import { MatchFinishedEventListener } from "../../match/infraestructure/event-listeners/match-finished.listener";
import { MATCH_FINISHED } from "../../match/domain/events/match-finished.event";
import { CURRENT_ROUND_CHANGED } from "../../match/domain/events/current-round-changed.event";
import { Case } from "../../match/domain/case";
import { RoundFinishedEventListener } from "../../match/infraestructure/event-listeners/round-finished.listner";
import { ROUND_FINISHED } from "../../match/domain/events/round-finished.event";
import { PowerPlayerWithoutCaseSelectedEventListener } from "../../powers/infraestructure/event-listeners/player-without-case-selected.listener";
import { UsePowerController } from "../../powers/infraestructure/controllers/use-power.controller";
import { ChangeIsSafeUsedEventListener } from "../../powers/infraestructure/event-listeners/change-issafe-used.listener";
import { CHANGE_ISSAFE_USED } from "../../powers/domain/events/change-issafe-used.event";
import { CurrentCasePeakedEventListener } from "../../powers/infraestructure/event-listeners/current-case-peaked.listener";
import { CURRENT_CASE_PEEKED } from "../../powers/domain/events/current-case-peaked.event";
import { StealCasePowerUsedEventListener } from '../../powers/infraestructure/event-listeners/steal-case-power-used.listener';
import { STEAL_CASE_POWER_USED } from "../../powers/domain/events/steal-case-power-used.event";

interface ServerToClientEvents {
    noArg: () => void;
    serverMesssage: (user : { user : String }) => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
    recibirMensajes: (payload : any) => void;
    createRoom:(payload : any) => void;
    addPlayerController: (payload: JoinPlayerToRoomDTO) => void;
  }
const app = express()
const server = createServer(app)
export const io = new Server(server)  
export const listen = (port : string) => {


    app.use(cors())
    app.use(express.json())
    app.use('/api/room', roomRouter)
    io.on('connection',(client) => {
        
        if (!client.handshake.query["uid"])  {
          client.disconnect();
          console.log(`[Socket-info] ${client.handshake.address} was disconnected because doesnt provide a uid`)
          return;
        }

        client.join(`${client.handshake.query["uid"]}`)
      
        console.log(`[Socket-info] ${client.handshake.address} client connected`)

        //TODO : Los eventos del socket moverlos a otra parte
        client.on("JoinPlayerToRoom", (payload: any) =>{
            const controller = new JoinPlayerToRoomController( new SocketIO(client) )
            controller.execute(payload)
        })

        client.on("LeavePlayerFromRoom", (payload: any) =>{
          const controller = new LeavePlayerFromRoomController( new SocketIO(client) )
          controller.execute(payload)
        } )

        client.on("StartMatch", (payload: any) => {
          const controller = new StartMatchController()
          //TODO : validar payload
          controller.execute(payload)
        }) ,
        
        client.on("SelectPlayerWithoutCase", (payload) => {
          const controller = new SelectPlayerWithoutCaseController()
          controller.execute(payload)
        })

        client.on("SelectCase", (payload) => {
          const controller = new SelectCaseController()
          controller.execute(payload)
        })

        client.on("SeeCurrentCase", async (payload) => {
          //TODO : esto se puede mejorar
          const controller = new GetCurrentCaseController()
          const currentCase = await controller.execute(payload)
          io.to(`${client.handshake.query["uid"]}`).emit("SawCurrentCase", currentCase)
        })

        client.on("OpenCurrentCase", async (payload) => {
          //TODO : esto se puede mejorar
          const controller = new OpenCurrentCaseController()
          const currentCase = await controller.execute(payload)
          io.to(`${currentCase.roomId}`).emit("CurrentCaseOpened", 
            {
              caseId : currentCase.caseId, 
              isSafe : currentCase.isSafe
            }
          )
        })

        client.on("FinishDuel", (payload) => {
          const controller = new FinishDuelController()
          controller.execute(payload)
        })

        client.on("KeepCase", (payload) => {
          //TODO : esto se puede mejorar
          const controller = new KeepCaseController()
          controller.execute(payload)
        })

        client.on("StealCase", (payload) => {
          //TODO : esto se puede mejorar
          const controller = new StealCaseController()
          controller.execute(payload)
        })

        client.on("UsePower", (payload) => {
          //TODO : esto se puede mejorar
          const controller = new UsePowerController()
          controller.execute(payload)
        })

        client.on('disconnect', ()=>{
            client.leave(`${client.handshake.query["uid"]}`)
            console.log(`[Socket-info] ${client.handshake.address} client disconnected`)
        })
    })

    new PlayerJoinedEventListener(
      [PLAYER_JOINED],
      //TODO: Creo que seria mejor que ell playerjoined se suscriba  algo como eventMediator.suscribe(PlayerJoined, controller)
      eventMediator,
      io,
    )

    new PlayerLeavedEventListener(
      [PLAYER_LEAVED],
      eventMediator,
      io,
    )

    new RoomEmptiedEventListener(
      [ROOM_EMPTIED],
      eventMediator,
    )

    new MatchStartedEventListener(
      [MATCH_STARTED],
      eventMediator,
      io,
    )

    new CurrentCaseChangedEventListener(
      [CURRENT_CASE_CHANGED],
      eventMediator,
      io,
    )
    
    new PlayerWithoutCaseSelectedEventListener(
    [PLAYER_WITHOUT_CASE_SELECTED],
      eventMediator,
      io
    )

    new CaseKeptEventListener(
      [CASE_KEPT],
      eventMediator,
      io
    )

    new CaseStoleEventListener(
      [CASE_STOLE],
      eventMediator,
      io
    )

    new DuelFinishedEventListener(
      [DUEL_FINISHED, CURRENT_ROUND_CHANGED],
      eventMediator,
      io,
    )

    new RoundFinishedEventListener(
      [ROUND_FINISHED],
      eventMediator,
    )

    new MatchFinishedEventListener(
      [MATCH_FINISHED],
      eventMediator,
      io,
    )

    new PowerPlayerWithoutCaseSelectedEventListener(
      [PLAYER_WITHOUT_CASE_SELECTED],
      eventMediator,
      io
    )

    new ChangeIsSafeUsedEventListener(
      [CHANGE_ISSAFE_USED],
      eventMediator,
      io
    )

    new CurrentCasePeakedEventListener(
      [CURRENT_CASE_PEEKED],
      eventMediator,
      io
    )

    new StealCasePowerUsedEventListener(
      [STEAL_CASE_POWER_USED],
      eventMediator,
      io
    )

    server.listen(port, () => {
        console.log("[Server-info] listen to port", port)
    })
}
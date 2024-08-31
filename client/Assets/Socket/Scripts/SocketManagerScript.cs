using System.Collections;
using System.Collections.Generic;
using System.Threading;
using SocketIOClient;
using SocketIOClient.Newtonsoft.Json;
using UnityEngine;
using Newtonsoft.Json.Linq;

using System;
using Newtonsoft.Json;
using System.Linq;
using static SocketIOUnity;
using System.Threading.Tasks;
using UnityEngine.SceneManagement;
using Unity.VisualScripting;


public class SocketManagerScript : MonoBehaviour
{

    public SocketIOUnity socket;

    [Header("Debug")]
    public bool initializeOnStart = false;

    [Header("Socket Parameters")]
    public string serverIP;
    public string serverPort;
    public float socketTimeout = 60f;
    private SynchronizationContext mainThread;

    [Header("Events")]
    public GameEvent startConneting;
    public GameEvent connected;
    public GameEvent errorOccurred;
    public GameEvent JoiningRoomStarted;
    public GameEvent playerJoined;
    public GameEvent playerLeaved;
    public GameEvent matchStarted;
    public GameEvent sawCurrentCase;
    public GameEvent caseSelected;
    public GameEvent caseStole;
    public GameEvent caseKept;
    public GameEvent playerWithoutCaseSelected;
    public GameEvent updateMatchState;
    public GameEvent matchFinished;
    public GameEvent powerCreated;
    public GameEvent currentPlayerAsPowerOwnerSelected;
    public GameEvent powerUsed;
    public GameEvent currentCaseOpened;
    public GameEvent StealCasePowerUsed;


    void Awake()
    {
        mainThread = SynchronizationContext.Current;
        if ( mainThread == null)
        {
            mainThread = new SynchronizationContext();
        }

        if ( initializeOnStart )
        {
            Initialize(
                JsonConvert.SerializeObject(
                     new
                     {
                         IP = serverIP,
                         PORT = serverPort,
                     }
                 )
            );
        }
        
    }

    // Start is called before the first frame update
    public void Initialize(object serverSettingsObj)
    {
        //TODO: Validate deserealization, also I think this can be better xd
        var serverSettings = JsonConvert.DeserializeObject<Dictionary<string,string>>((string)serverSettingsObj);
        serverIP = serverSettings["IP"];
        serverPort = serverSettings["PORT"];

        var uri = new Uri("http://" + serverIP + ':' + serverPort);
        //var uri = new Uri("https://" + serverIP) ;

        socket = new SocketIOUnity(uri, new SocketIOOptions
        {
            EIO = 4,
            Transport = SocketIOClient.Transport.TransportProtocol.WebSocket,
            Query = new Dictionary<string, string>() {
                {"uid", PlayerStateScript.id.ToString()}
            }
        });

        socket.JsonSerializer = new NewtonsoftJsonSerializer();
        socket.unityThreadScope = UnityThreadScope.Update;


        socket.OnConnected += (sender, e) =>
        {
            Debug.Log("socket.OnConnected");
            mainThread.Send((object state) =>
            {
                connected.Raise("Connected");
                CancelInvoke(nameof(ConnectionLost));
                //TODO: AAAAAAAAAAAAAAAAAAAA cambiar
                if (!initializeOnStart)
                    SceneManager.LoadScene("JoinRoomScene");
            }, null);
        };

        socket.OnDisconnected += (sender, e) =>
        {
            print("disconnect: " + e);
        };

        socket.OnUnityThread("playerJoined", (data) =>
        {
            var players = data.GetValue<Dictionary<string, string>[]>();
            StartCoroutine(PlayerJoined(players));
        });

        socket.OnUnityThread("playerLeaved", (data) =>
        {
            var players = data.GetValue<Dictionary<string, string>[]>();
            playerLeaved.Raise(players);
        });

        socket.OnUnityThread("MatchStarted", (data) =>
        {
            var currentRound = data.GetValue<CurrentRoundDTO>();
            StartCoroutine(OnMatchStarted(currentRound));
        });

        socket.OnUnityThread("CaseSelected", (data) =>
        {
            var caseId = data.GetValue<string>();
            caseSelected.Raise(caseId);
        });

        socket.OnUnityThread("PlayerWithoutCaseSelected", (data) =>
        {
            var playerWithoutCase = data.GetValue<PlayerResponse>();
            playerWithoutCaseSelected.Raise(playerWithoutCase);
        });

        socket.OnUnityThread("SawCurrentCase", (data) =>
        {
            var currentCase = data.GetValue<CurrentCase>();
            sawCurrentCase.Raise(currentCase);
        });

        socket.OnUnityThread("CaseStole", (data) =>
        {
            var stealData = data.GetValue<Dictionary<string, string>>();
            caseStole.Raise(stealData);    
        });

        socket.OnUnityThread("CaseKept", (data) =>
        {
            var keptData = data.GetValue<Dictionary<string, string>>();
            caseKept.Raise(keptData);
        });

        socket.OnUnityThread("PowerOwnerSelected", (data) =>
        {
            var powerData = data.GetValue<Dictionary<string, string>>();
            currentPlayerAsPowerOwnerSelected.Raise(powerData);

        });

        socket.OnUnityThread("PowerCreated", (data) =>
        {
            var powerData = data.GetValue<Dictionary<string, string>>();
            powerCreated.Raise(powerData); 
        });

        socket.OnUnityThread("ChageIsSafeUsed", (data) =>
        {
            var changeIsSafeUsed = data.GetValue<Dictionary<string, string>>();
            changeIsSafeUsed.Add("powerName", "changeIsSafeUsed");
            powerUsed.Raise(changeIsSafeUsed);
        });

        socket.OnUnityThread("CurrentCasePeakedToOwner", (data) =>
        {   
            var caseId = data.GetValue<Dictionary<string, string>>()["caseId"];
            var isSafeString = data.GetValue<Dictionary<string, string>>()["isSafe"];
            var isSafe = false;
            Debug.Log("Is Safe string de currentCasePeakedToOwner " + isSafeString);
            if (isSafeString == "true")
            {
                isSafe = true;
            }
            var currentCase = new CurrentCase(caseId, isSafe);
            sawCurrentCase.Raise(currentCase);

        });

        socket.OnUnityThread("CurrentCasePeaked", (data) =>
        {
            var currentCasePeaked = data.GetValue<Dictionary<string, string>>();
            var playerId = currentCasePeaked["playerId"];
            if (playerId == PlayerStateScript.id.ToString()) return;
            currentCasePeaked.Add("powerName", "currentCasePeaked");
            powerUsed.Raise(currentCasePeaked);
        });

        socket.OnUnityThread("StealCasePowerUsed", (data) =>
        {
            var stealCasePowerUsed = data.GetValue<Dictionary<string, string>>();
            stealCasePowerUsed.Add("powerName", "stealCasePowerUsed");
            powerUsed.Raise(stealCasePowerUsed);
            StealCasePowerUsed.Raise(stealCasePowerUsed);
        });

        socket.OnUnityThread("CurrentCaseOpened", (data) =>
        {
            var currentCase = data.GetValue<Dictionary<string, string>>();
            currentCaseOpened.Raise(currentCase);   
        });

        socket.OnUnityThread("UpdateMatchState", (data) =>
        {
            var currentRound = data.GetValue<CurrentRoundDTO>();
            Debug.Log("UpdateMatchState");
            updateMatchState.Raise(currentRound);
        });

        socket.OnUnityThread("MatchFinished", (data) =>
        {
            var winnerPlayer = data.GetValue<PlayerResponse>();
            Debug.Log("player winner" + winnerPlayer.name);
            matchFinished.Raise(winnerPlayer);
        });

        //TODO: cambiar a como estaba antes xd
        Debug.Log("Connecting...");
        _ = Connect();

    }

    private IEnumerator OnMatchStarted(CurrentRoundDTO currentRound)
    {
        if (SceneManager.GetActiveScene().name != "MatchScene")
        {
            AsyncOperation asyncLoad = SceneManager.LoadSceneAsync("MatchScene");
            while (!asyncLoad.isDone)
            {
                yield return null;
            }
        }
        updateMatchState.Raise(currentRound);
        matchStarted.Raise(currentRound);
    }

    private IEnumerator PlayerJoined(Dictionary<string, string>[]  players)
    {
        if (SceneManager.GetActiveScene().name != "RoomScene")
        {
            AsyncOperation asyncLoad = SceneManager.LoadSceneAsync("RoomScene");
            while (!asyncLoad.isDone)
            {
                yield return null;
            }
        }

        playerJoined.Raise(players);
    }

    
    private async Task Connect()
    {
        if ( socket != null)
        {
            startConneting.Raise("Connecting...");
            Invoke(nameof(ConnectionLost), socketTimeout);
            await socket.ConnectAsync();
        }
    }

    private void OnDisable()
    {
        if ( socket != null)
        {
            socket.Disconnect();
            socket.Dispose();
        }
    }

    public void JoinPlayerToRoom(object roomName)
    {
        var player = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerStateScript>();
        JoiningRoomStarted.Raise("Joining to Room...");
        socket.Emit("JoinPlayerToRoom", new
        {
            roomId = roomName as string,
            playerId = PlayerStateScript.id,
            playerName = player.nickname,
            playerColor = ColorParser.UnityColorToColorId(player.color),
        }) ;
    }

    public void LeavePlayerFromRoom(object roomName)
    {
        var player = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerStateScript>();
        socket.Emit("LeavePlayerFromRoom", new
        {
            roomId = roomName as string,
            playerId = PlayerStateScript.id,
        });
        SceneManager.LoadScene("JoinRoomScene");
    }

    public void SelectPlayerWithoutCase(object playerIdObj)
    {
        var playerId = ((Dictionary<string, string>)playerIdObj)["playerWithoutCaseId"];

        socket.Emit("SelectPlayerWithoutCase", new
        {
            matchId  = MatchStateScript.id,
            playerWithoutCaseId = playerId
        });
    }

    public void SelectCase(object caseIdObj)
    {
        var caseId = ((Dictionary<string, string>)caseIdObj)["caseId"];
        socket.Emit("SelectCase", new
        {
            matchId = MatchStateScript.id,
            caseId,
        });
    }

    //TODO cambiar el nombre del metodo
    public void SeeCurrentCase()
    {
        socket.Emit("SeeCurrentCase", new
        {
            matchId = MatchStateScript.id,
        });

    }

    public void KeepCase()
    {
        socket.Emit("KeepCase", new
        {
            matchId = MatchStateScript.id,
            playerId = PlayerStateScript.id
        });
        Invoke(nameof(OpenCurrentCase), 5f);

    }

    public void StealCase()
    {
        socket.Emit("StealCase", new
        {
            matchId = MatchStateScript.id,
            playerId = PlayerStateScript.id
        });
        Invoke(nameof(OpenCurrentCase), 5f);

    }

    public void UsePower()
    {
        socket.Emit("UsePower", new
        {
            matchId = MatchStateScript.id,
            powerId = MatchStateScript.currentPowerId
        });
    }

    private void OpenCurrentCase()
    {
        socket.Emit("OpenCurrentCase", new
        {
            matchId = MatchStateScript.id,
        });
    }

    public void FinishDuel()
    {
        socket.Emit("FinishDuel", new
        {
            matchId = MatchStateScript.id,
        });
    }

    private void ConnectionLost()
    {
        print("Connection Lost");
        errorOccurred.Raise(new Exception("Connection Lost"));
    }


    public void StartMatch(object roomIdObj)
    {
        var roomid = roomIdObj as string;
        socket.Emit("StartMatch", new
        {
            roomId = roomid
        });
    }
    public void SendCreateRoom(String user)
    {
        socket.Emit("createRoom", new
        {
            roomId = "14",
        });
    }
}

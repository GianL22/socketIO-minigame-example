using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using Newtonsoft.Json;

public class HttpManagerScript : MonoBehaviour
{
    [Header("Server")]
    public string serverIP;
    public string serverPort;
    private string _url;
    private Result<string> response;

    [Header("Game Events")]
    public GameEvent startLoading;
    public GameEvent loaded;
    public GameEvent RoomCreated;

    private void Start()
    {
        _url = "http://" + serverIP + ':' + serverPort.ToString();
        //_url = "https://" + serverIP;
    }

    public void StartCreatingRoom(object data)
    {
        var json = JsonConvert.SerializeObject( new {
            roomId = (string) data,
        });
        StartCoroutine(CreateRoom(json));
    }

    private IEnumerator CreateRoom(string json)
    {
        startLoading.Raise("Creating Room");
        
        yield return Post(_url + "/api/room/create",json);

        if (response.IsSuccessful())
        {
            var roomId = JsonConvert.DeserializeObject<Dictionary<string, string>>(response.Value)["id"];
            RoomCreated.Raise(roomId);
            yield break;
        }
        print(response.Exception.Message);
    }


    private IEnumerator Post(string url, string bodyJsonString)
    {
        var request = new UnityWebRequest(url, "POST");
        byte[] bodyRaw = Encoding.UTF8.GetBytes(bodyJsonString);
        request.uploadHandler = (UploadHandler)new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = (DownloadHandler)new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        yield return request.SendWebRequest();
        if (request.result == UnityWebRequest.Result.ConnectionError)
        {
            print(request.error);
            response = Result<string>.MakeError(new System.Exception(request.error));
        }
        else
        {
            print(request.downloadHandler.text);
            response = Result<string>.MakeSuccesful(request.downloadHandler.text);
        }

    }
}

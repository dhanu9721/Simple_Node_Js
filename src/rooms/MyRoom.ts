import { Room, Client, ClientArray } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState.js";
import { IncomingMessage } from "http";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });
  }

  onAuth(client: Client, options: any, request?: IncomingMessage) {
    console.log("onAuth", client.sessionId);
    return true;
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    client.send("joined", { name: "dahanajay" })
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}

import { Injectable } from '@angular/core';
import * as signalr from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class CollabService {
  private roomName = '';
  private userName = '';
  public connection = new signalr.HubConnectionBuilder()
    .withUrl('https://api-erdiagrams.azurewebsites.net/hub/board', {
      skipNegotiation: true,
      transport: signalr.HttpTransportType.WebSockets,
    })
    .configureLogging(signalr.LogLevel.Information)
    .build();
  constructor() {
    this.start();
    this.connection.on('receiveMessage', (user: string, message: string) => {
      console.log('receiveMessage', user, message);
    });

    this.connection.on('receiveConnectedUser', (users: any) => {
      console.log('receiveConnectedUser', users);
    });
  }

  //start connection
  public async start() {
    try {
      await this.connection.start();
      console.log('Connection started');
    } catch (err) {
      console.log('Error while starting connection: ' + err);
      setTimeout(() => this.start(), 5000);
    }
  }

  //join room
  public async joinRoom(userName: string, roomName: string) {
    await this.connection.invoke('JoinRoom', { userName, roomName });
  }
  //send message
  public async sendMessage(userName: string, roomName: string, diagram: any) {
    return this.connection.invoke('Send', diagram);
  }
  //leave room
  public async leaveRoom() {
    await this.connection.stop();
  }
  //receive message

  public setRoomName(roomName: string) {
    this.roomName = roomName;
  }

  public getRoomName() {
    return this.roomName;
  }

  public setUserName(userName: string) {
    this.userName = userName;
  }

  public getUserName() {
    return this.userName;
  }
}

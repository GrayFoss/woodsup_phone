import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class PanoWebSocketService {
  private actionUrl: string;
  private headers: Headers;
  private websocket: any;
  private receivedMsg: any;
  private isConnected = false;
  public sendMessage(text: string) {
    this.websocket.send(text);
  }

  public getIsCon() {
    return this.isConnected;
  }
  public GetPanoStatus(url: string): Observable<any> {
    this.websocket = new WebSocket(url); // dummy echo websocket service
    this.websocket.onopen =  (evt) => {
      // this.websocket.send("我来了，啦啦啦啦啦~");
      // console.log('全景传播open');
      this.isConnected = true;
    };

    return Observable.create((observer) => {
      this.websocket.onmessage = (evt) => {
        observer.next(evt);
      };
    })
      .map((res) => res.data)
      .share();
  }
}

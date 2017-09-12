import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs';
@Injectable()
export class WebSocketService {
  private actionUrl: string;
  private headers: Headers;
  private websocket: any;
  private receivedMsg: any;
  public sendMessage(text: string) {
    this.websocket.send(text);
  }
  public GetInstanceStatus(url: string): Observable<any> {
    this.websocket = new WebSocket(url); // dummy echo websocket service
    this.websocket.onopen =  (evt) => {
      this.websocket.send('我来了，啦啦啦啦啦~');
    };
    return Observable.create((observer) => {
      this.websocket.onmessage = (evt) => {
        observer.next(evt);
      };
    })
      .map((res) => res.data)
      .share();
  }
  public GetPanoStatus(url: string): Observable<any> {
    this.websocket = new WebSocket(url); // dummy echo websocket service
    this.websocket.onopen =  (evt) => {
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

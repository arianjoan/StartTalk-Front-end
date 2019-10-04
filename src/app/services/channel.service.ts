import { Injectable } from '@angular/core';
import { Channel } from '../models/channel';
import { environment } from 'src/environments/environment.prod';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor() { }

  channels: Channel[] = [];
  private currentChannel$  = new Subject<String>();
  private currentChannel  : String = "CH35e0a2e365ed4875b0ac5712bd9d671f";

  private getChannels(): Promise<Channel[]> {
    return new Promise((resolve, eject) => {
      var request = new XMLHttpRequest();
      request.open('GET',environment.backend + 'channels');
      request.responseType = 'json';
      request.onload = () => {
        return resolve(this.mapChannels(request.response));
      }
      request.onerror = () => {
        return eject(Error('Aqui hubo un error'));
      }
      request.send();
    })
  }

  loadChannels(): Promise<Channel[]> {

    return this.getChannels();

  }

  private mapChannels(channels): Channel[] {

    var channelsReturn: Channel[] = [];

    channels.forEach(ch => {

      let channel: Channel = new Channel();
      channel.name = ch.friendlyName;
      channel.id = ch.sid;
      channelsReturn.push(channel);

    });

    return channelsReturn;
  }

  public setCurrentChannel(currentChannel : String){
    this.currentChannel = currentChannel;
    this.currentChannel$.next(this.currentChannel);
  }

  public getCurrentChannel$() : Observable<String>{
    return this.currentChannel$.asObservable();
  }
}

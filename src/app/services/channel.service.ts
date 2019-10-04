import { Injectable } from '@angular/core';
import { Channel } from '../models/channel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor() { }

  channels: Channel[] = [];

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
}

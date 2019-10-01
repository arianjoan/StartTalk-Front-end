import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Channel } from 'src/app/models/channel';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  @Input()
  channels : Channel[] = [];

  @Output()
  idMessageEvent = new EventEmitter<String>();

  ngOnInit(){
    this.loadChannels();
  }

  constructor() { }

  getChannels(){
    return new Promise((resolve,eject) => {
      var request = new XMLHttpRequest();
      request.open('GET','http://192.168.1.111:8080/channels');
      request.responseType = 'json';
      request.onload = () => {
        return resolve(request.response);
      }
      request.onerror = () => {
        return eject(Error('Aqui hubo un error'));
      }
      request.send();
    })
  }

  async loadChannels(){
  var channels;
  channels = await this.getChannels();
  channels = this.mapChannels(channels);
  this.channels = channels;
  console.log(channels);
  }

  mapChannels (channels) : Channel[]{

    var channelsReturn : Channel[] = [];

    channels.forEach(ch => {

      let channel : Channel = new Channel();
      channel.name = ch.friendlyName;
      channel.id = ch.sid;
      channelsReturn.push(channel);

    });

    return channelsReturn;
  }

  entryChannel(id : String){
    console.log(id);
    this.idMessageEvent.emit(id);
  }


  

}

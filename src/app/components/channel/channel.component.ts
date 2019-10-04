import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from 'src/app/services/channel.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channels : Promise<Channel[]>;

  constructor(private serviceChannel : ChannelService) { }

  ngOnInit(){
    this.channels =  this.serviceChannel.loadChannels();
  }

  setCurrentChannel(id){
    this.serviceChannel.setCurrentChannel(id);
  }
 
}

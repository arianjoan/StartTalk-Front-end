import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor() { }

  getChannels(){
    return new Promise((resolve,ejecturo) => {
      var request = new XMLHttpRequest();
      request.open('GET','http://localhost:8080/channels');
      request.responseType = 'json';
      request.onload = () => {
        return request.response;
      }
      request.onerror = () => {
        Error('Aqui hubo un error');
      }
      request.send();
    })
  }
  async showChannels(){
  var channels;
  channels = await this.getChannels();
  console.log(channels);
  }


  ngOnInit() {
  }

}

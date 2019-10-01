import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  messages : Message[] = [];
  @Input()
  idMessageEvent = 'msgEvent';


  constructor() { }

  ngOnInit() {
  }

  getMessages(id){
    return new Promise((resolve,eject) => {
      var request = new XMLHttpRequest();
      request.open('GET','http://192.168.1.111:8080/channels/'+id+'/messages');
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

  async loadMessages(id){
    var messages;
    messages = await this.getMessages(id);
    messages = this.mapMessages(messages);
    this.messages = messages;
    console.log(messages);
    }
  
    mapMessages (messages) : Message[]{
  
      var messagesReturn : Message[] = [];
  
     messages.forEach(msg => {
  
        let message : Message = new Message();
        message.body = msg.body;
        message.id = msg.sid;
        messagesReturn.push(message);
  
      });
  
      return messagesReturn;
    }

}

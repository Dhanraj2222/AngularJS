import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css',

})
export class ServersComponent {

  allownewServer = false;
  serverCreationStatus = 'No'
  serverName = 'TestServer' 
  serverCrerated = false

  constructor(){
    setTimeout(() => {
      this.allownewServer = true;
    }, 2000);
  }


  onUpdateServerName(event:Event){
    this.serverName =(<HTMLInputElement>event.target).value;

  }

  onCreateServer(){
    this.serverCrerated= true;
    this.serverCreationStatus = 'Server Was Created Name is' + this.serverName;
  }

}

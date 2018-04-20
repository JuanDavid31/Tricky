import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    letraInicial:string= "";


    empiezaX(){
        this.letraInicial = 'X';
    }

    empiezaO(){
        this.letraInicial = 'O';
    }
}

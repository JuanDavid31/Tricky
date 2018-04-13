import { Component} from '@angular/core';
import { Turno } from '../objetos/Turno';

@Component({
  selector: 'tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent{

    casillas:Turno[] = [
        {id:1, letra:''},
        {id:2, letra:''},
        {id:3, letra:''},
        {id:4, letra:''},
        {id:5, letra:''},
        {id:6, letra:''},
        {id:7, letra:''},
        {id:8, letra:''},
        {id:9, letra:''}
    ];
    turnoActual:string = 'X';
    comboGanador:string = '';
    hayGanador:boolean = false;

    evaluar(turno:Turno){
        if(this.hayGanador) return;
        this.insertar(turno);
        if(this.seAcaboLaPartida()){
            this.hayGanador = true;
        }else{
            this.cambiarTurno();
        }
    }

    insertar(turno:Turno){
        this.casillas[turno.id-1].letra = turno.letra;
    }

    seAcaboLaPartida(){
        let casillasO = this.darCasillas('O');
        let casillasX = this.darCasillas('X');
        let comboX = this.darComboGanador(casillasX);
        let comboO = this.darComboGanador(casillasO);
        if(comboX){
            this.comboGanador = comboX;
            return true;
        }else if(comboO){
            this.comboGanador = comboO;
            return true;
        }
        return false;
    }

    darCasillas(letra){
        let casillas = '';
        this.casillas.forEach((c) =>{
            if(c.letra === letra){
                casillas += c.id;
            }
        })
        return casillas;
    }

    darComboGanador(casillas){
        if(casillas.includes('123')) return '123';
        if(casillas.includes('456')) return '456';
        if(casillas.includes('789')) return '789';
        if(casillas.includes('147')) return '147';
        if(casillas.includes('258')) return '258';
        if(casillas.includes('369')) return '369';
        if(casillas.includes('159')) return '159';
        if(casillas.includes('357')) return '357';
        return '';
    }

    cambiarTurno(){
        if(this.turnoActual === 'X'){
            this.turnoActual = 'O';
            this.buscarCasillaLibre(); //ejecutamos el algoritmo
        }else{
            this.turnoActual = 'X';
        }
    }

    buscarCasillaLibre(){
        let nuevoTurno = { id:-1, letra:''};

        for(let i = 0; i < this.casillas.length; i++){
            let casilla = this.casillas[i];
            if(casilla.letra === ''){
            nuevoTurno.id = i+1;
            nuevoTurno.letra = 'O';
            this.evaluar(nuevoTurno);
            return;
            }
        }
    }
}

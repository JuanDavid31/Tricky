import { Component, Input} from '@angular/core';
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
    @Input('letraInicial')turnoActual:string = '';
    comboGanador:string = '';
    partidaAcaba:boolean = false;
    puntajeX:number = 0;
    puntajeO:number = 0;

    ngOnInit(){
        this.jugadaInicial();
    }

    jugadaInicial(){
        if(this.turnoActual === 'O'){
            this.turnoActual = 'X';
            this.cambiarTurno();
        }   
    }
    
    evaluar(turno:Turno){
        if(this.partidaAcaba) return;
        this.insertar(turno);
        if(this.seAcaboLaPartida(this.casillas)){
            this.partidaAcaba = true;
        }else{
            this.cambiarTurno();
        }
    }

    insertar(turno:Turno){
        this.casillas[turno.id-1].letra = turno.letra;
    }

    seAcaboLaPartida(juego: Turno[]){
        let casillasO = this.darCasillas('O', juego);
        let casillasX = this.darCasillas('X', juego);
        let comboX = this.darComboGanador(casillasX);
        let comboO = this.darComboGanador(casillasO);
        if(comboX){
            this.comboGanador = comboX;
            this.puntajeX++;
        }else if(comboO){
            this.comboGanador = comboO;
            this.puntajeO++;
        }
        return this.darEstadoActual(this.casillas);
    }

    darCasillas(letra, juego: Turno[]){
        let casillas = '';
        juego.forEach((c) =>{
            if(c.letra === letra){
                casillas += c.id;
            }
        })
        return casillas;
    }

    darComboGanador(casillas){
        if(casillas.includes('1') && casillas.includes('2') && casillas.includes('3')) return '123';
        if(casillas.includes('4') && casillas.includes('5') && casillas.includes('6')) return '456';
        if(casillas.includes('7') && casillas.includes('8') && casillas.includes('9')) return '789';
        if(casillas.includes('1') && casillas.includes('4') && casillas.includes('7')) return '147';
        if(casillas.includes('2') && casillas.includes('5') && casillas.includes('8')) return '258';
        if(casillas.includes('3') && casillas.includes('6') && casillas.includes('9')) return '369';
        if(casillas.includes('1') && casillas.includes('5') && casillas.includes('9')) return '159';
        if(casillas.includes('3') && casillas.includes('5') && casillas.includes('7')) return '357';
        return '';
    }

    cambiarTurno(){
        if(this.turnoActual === 'X'){
            this.turnoActual = 'O';
            let nuevaJugada = this.buscarSiguienteJugada(); //ejecutamos el algoritmo
            this.evaluar(nuevaJugada.jugada);
        }else{
            this.turnoActual = 'X';
        }
    }

    buscarSiguienteJugada(){
        let juego = this.casillas.map(casilla => casilla);
        let siguienteJugada =  this.miniMax(juego, 'O');
        return siguienteJugada;
    }

    miniMax(juegoActual:Turno[], turnoActual){
        let estadoActual = this.darEstadoActual(juegoActual);
        if(estadoActual === 'X') return -1;
        else if(estadoActual === 'O') return 1;
        else if(estadoActual === 'Empate') return 0;

        let jugadasLibres = this.darJugadasLibres(juegoActual);
        
        let proximasJugadas = [];

        if(turnoActual === 'O'){
            for(let i = 0; i < jugadasLibres.length; i++){
                this.agregarJugada(juegoActual, jugadasLibres[i], turnoActual);
                let jugadaResultado = this.miniMax(juegoActual, 'X'); //Resultado de la jugada
                if(typeof jugadaResultado !== 'number') jugadaResultado = jugadaResultado.valor;
                proximasJugadas.push({valor: jugadaResultado, jugada:{ id:jugadasLibres[i].id, letra:'O'}});
                this.eliminarJugada(juegoActual, jugadasLibres[i]);
            }
            return this.darMejorJugada(proximasJugadas);
        }else{
            for(let i = 0; i < jugadasLibres.length; i++){
                this.agregarJugada(juegoActual, jugadasLibres[i], turnoActual);
                let jugadaResultado = this.miniMax(juegoActual, 'O');
                if(typeof jugadaResultado !== 'number') jugadaResultado = jugadaResultado.valor;
                proximasJugadas.push({valor: jugadaResultado, jugada:{id:jugadasLibres[i].id, letra:'X'}});
                this.eliminarJugada(juegoActual, jugadasLibres[i]);
            }       
            return this.darPeorJugada(proximasJugadas);
        }
    }

    darEstadoActual(juego:Turno[]){
        let casillasO = this.darCasillas('O', juego);
        let casillasX = this.darCasillas('X', juego);
        let comboX = this.darComboGanador(casillasX);
        let comboO = this.darComboGanador(casillasO);
        if(comboX){
            return 'X';
        }else if(comboO){
            return 'O';
        }else if(this.darCasillasOcupadas(juego).length === 9){
            return 'Empate';
        }
        return '';
    }

    darCasillasOcupadas(juego:Turno[]){
        return juego.filter(e => e.letra !== "");
    }

    darJugadasLibres(juegoActual){
        return juegoActual.filter( elemento =>elemento.letra === '');
    }

    darMejorJugada(jugadas){
        let max = -2;
        let index = -1;
        for(let i = 0; i < jugadas.length; i++){
            if(jugadas[i].valor > max) {
                max = jugadas[i].valor;
                index = i;
            }
        }
        return jugadas[index];
    }

    darPeorJugada(jugadas){
        let index = -1;
        let min = 99;
        for(let i = 0; i < jugadas.length; i++){
            if(jugadas[i].valor < min){
                index = i;
                min = jugadas[i].valor;
            }
        }
        return jugadas[index];
    }

    agregarJugada(juegoActual, jugada, turnoActual){
        juegoActual[jugada.id - 1].letra = turnoActual;
    }

    generarArbolDeJugadas(juegoActual, turnoActual, proximasJugadas){
        let turnoSiguiente = turnoActual === 'X' ? 'O': 'X';
        let jugadaResultado = this.miniMax(juegoActual, turnoSiguiente); //Resultado de la jugada
        if(typeof jugadaResultado !== 'number') jugadaResultado = jugadaResultado.valor;
        //proximasJugadas.push({valor: jugadaResultado, jugada:{ id:jugadasLibres[i].id, letra:'O'}});
    }

    eliminarJugada(juegoActual, jugada){
        juegoActual[jugada.id - 1].letra = '';
    }

    juegoNuevo(){
        this.casillas = [
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
        this.turnoActual = 'X';
        this.comboGanador = '';
        this.partidaAcaba = false;
    }

}

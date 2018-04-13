import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Turno } from '../objetos/Turno';

@Component({
  selector: 'casilla',
  templateUrl: './casilla.component.html',
  styleUrls: ['./casilla.component.css']
})
export class CasillaComponent implements OnChanges{

    @Input('turnoEntrante') turnoActual:string;
    @Input('id')id:number;
    @Input('esGanadora') esGanadora:boolean = false;
    @Input('hayGanador') hayGanador:boolean = false;
    @Input('letraActual') letra:string;
    @Output('clickeado') evento:EventEmitter<Turno> = new EventEmitter<Turno>();

    ngOnChanges(){
        if(this.letra){ console.log('NgOnChanges', this.letra);
        }
    }

    onClick(){
        if(this.sePuedeMarcar())return;
        this.evento.emit({id: this.id, letra:this.turnoActual});
    }

    sePuedeMarcar(){
        return this.letra || this.hayGanador;
    }
}

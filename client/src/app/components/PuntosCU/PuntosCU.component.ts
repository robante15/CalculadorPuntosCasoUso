import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'PuntosCU',
  templateUrl: './PuntosCU.component.html',
  styleUrls: ['./PuntosCU.component.css'],
})
export class PuntosCUComponent {
  page = 1;
  title = 'Estimación por Punto de Casos de Uso';

  getPageSymbol(current: number) {
    return ['1', '2', '3', '4', '5'][current - 1];
  }

  constructor() {}
}

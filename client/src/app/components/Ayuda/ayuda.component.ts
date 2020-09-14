import { Component, OnInit } from '@angular/core';

interface TiposActores {
  TipoActor: string;
  Descripcion: string;
  Factor: number;
}

interface TiposCasosUso {
  TipoActor: string;
  Descripcion: string;
  Factor: number;
}

@Component({
  selector: 'Ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css'],
})
export class AyudaComponent {
  title = 'Ayuda';

  constructor() {}

  ListadoTipoActores: TiposActores[] = [
    {
      TipoActor: 'Simple',
      Descripcion:
        'Otro sistema que interactúa con el sistema a desarrollar mediante una interfaz de programación (API).',
      Factor: 1,
    },
    {
      TipoActor: 'Medio',
      Descripcion:
        'Otro sistema interactuando a través de un protocolo (ej. TCP/IP) o una persona interactuando a través de una interfaz en modo texto.',
      Factor: 2,
    },
    {
      TipoActor: 'Complejo',
      Descripcion:
        'Una persona que interactúa con el sistema mediante una interfaz gráfica (GUI).',
      Factor: 3,
    },
  ];

  BasadoTransacciones: TiposCasosUso[] = [
    {
      TipoActor: 'Simple',
      Descripcion: '3 transacciones o menos.',
      Factor: 5,
    },
    {
      TipoActor: 'Medio',
      Descripcion: '4 a 7 transacciones.',
      Factor: 10,
    },
    {
      TipoActor: 'Complejo',
      Descripcion: 'Más de 7 transacciones',
      Factor: 15,
    },
  ];

  BasadoClases: TiposCasosUso[] = [
    {
      TipoActor: 'Simple',
      Descripcion: 'Menos de 5 clases.',
      Factor: 5,
    },
    {
      TipoActor: 'Medio',
      Descripcion: '5 a 10 clases.',
      Factor: 10,
    },
    {
      TipoActor: 'Complejo',
      Descripcion: 'Más de 10 clases.',
      Factor: 15,
    },
  ];
}

import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';

interface FactoresCT {
  Descripcion: string;
  Peso: number;
  Valor: number;
}

@Component({
  selector: 'FactoresCT',
  templateUrl: './FactoresCT.component.html',
  styleUrls: ['./FactoresCT.component.css'],
  providers: [NgbRatingConfig],
})
export class FactoresCTComponent {
  title = 'Cálculo de los Factores de Complejidad Técnica';
  ResultadoTCF = {
    TFactor: 0,
    FCTValue: 0,
    TCF: [],
  };

  constructor(configRating: NgbRatingConfig) {
    configRating.max = 5;
  }

  FCT: FactoresCT[] = [
    {
      Descripcion: 'Sistema distribuido',
      Peso: 2,
      Valor: 0,
    },
    {
      Descripcion: 'Objetivos de performance o tiempo de respuesta',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'Eficiencia del usuario final',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'Procesamiento interno complejo',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'El código debe de ser reutilizable',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'Facilidad de instalación',
      Peso: 0.5,
      Valor: 0,
    },
    {
      Descripcion: 'Facilidad de uso',
      Peso: 0.5,
      Valor: 0,
    },
    {
      Descripcion: 'Portabilidad',
      Peso: 2,
      Valor: 0,
    },
    {
      Descripcion: 'Facilidad de cambio',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'Concurrencia',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'Incluye objetivos especiales de seguridad',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'Provee acceso directo a terceras partes',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion:
        'Se requiere facilidades especiales de entrenamiento a usuario',
      Peso: 1,
      Valor: 0,
    },
  ];

  CalculoFCT() {
    //Reiniciar el Array
    this.ResultadoTCF = {
      TFactor: 0,
      FCTValue: 0,
      TCF: [],
    };

    //Limpiar el LocalStorage
    localStorage.removeItem('ResultadoTCF');

    this.FCT.forEach((elemento) => {
      this.ResultadoTCF.TFactor += elemento.Peso * elemento.Valor;
      this.ResultadoTCF.TCF.push(elemento);
    });
    this.ResultadoTCF.FCTValue = 0.6 + 0.01 * this.ResultadoTCF.TFactor;
    //Guardar resultado en el LocalStorage
    localStorage.setItem('ResultadoTCF', JSON.stringify(this.ResultadoTCF));
  }
}

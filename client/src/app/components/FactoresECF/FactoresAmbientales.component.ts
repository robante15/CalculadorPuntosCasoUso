import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';

interface FactorAmb {
  Descripcion: string;
  Peso: number;
  Valor: number;
}

@Component({
  selector: 'FactoresAmbientales',
  templateUrl: './FactoresAmbientales.component.html',
  styleUrls: ['./FactoresAmbientales.component.css'],
  providers: [NgbRatingConfig],
})
export class FactoresAmbientalesComponent {
  title = 'Cálculo de los Factores ambientales';

  ResultadoECF = {
    EFactor: 0,
    EFValue: 0,
    E1E6Menor: 0,
    E7E8Mayor: 0,
    FactoresAmb: [],
  };

  constructor(configRating: NgbRatingConfig) {
    configRating.max = 5;
  }

  FactoresAmb: FactorAmb[] = [
    {
      Descripcion: 'Familiaridad con el modelo de proyecto utilizado.',
      Peso: 1.5,
      Valor: 0,
    },
    {
      Descripcion: 'Experiencia en la aplicación.',
      Peso: 0.5,
      Valor: 0,
    },
    {
      Descripcion: 'Experiencia en orientación a objetos.',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'Capacidad del analista líder.',
      Peso: 0.5,
      Valor: 0,
    },
    {
      Descripcion: 'Motivación.',
      Peso: 1,
      Valor: 0,
    },
    {
      Descripcion: 'Estabilidad de los requerimientos',
      Peso: 2,
      Valor: 0,
    },
    {
      Descripcion: 'Personal part-time',
      Peso: -1,
      Valor: 0,
    },
    {
      Descripcion: 'Dificultad del lenguaje de programación',
      Peso: -1,
      Valor: 0,
    },
  ];

  CalculoECF() {
    //Reiniciar el array
    this.ResultadoECF = {
      EFactor: 0,
      EFValue: 0,
      E1E6Menor: 0,
      E7E8Mayor: 0,
      FactoresAmb: [],
    };

    //Limpiar el LocalStorage
    localStorage.removeItem('ResultadoECF');

    this.FactoresAmb.forEach((elemento, index) => {
      this.ResultadoECF.EFactor += elemento.Peso * elemento.Valor;
      this.ResultadoECF.FactoresAmb.push(elemento);
      if (index < 6 && elemento.Valor < 3) {
        this.ResultadoECF.E1E6Menor += 1;
      }
      if (index > 5 && elemento.Valor > 3) {
        this.ResultadoECF.E7E8Mayor += 1;
      }
    });
    this.ResultadoECF.EFValue = 1.4 + -0.03 * this.ResultadoECF.EFactor;

    //Guardar resultado en el LocalStorage
    localStorage.setItem('ResultadoECF', JSON.stringify(this.ResultadoECF));
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'CalculoUCP',
  templateUrl: './CalculoUCP.component.html',
  styleUrls: ['./CalculoUCP.component.css'],
})
export class CalculoUCPComponent implements OnInit {
  title = 'Calculo UCP';
  UCPFinal: number = 0;

  CalculoHorasHombre = {
    FactorHoraPersona: 0,
    CantidadHorasPersona: 0,
    HHTotal: 0,
    EsfuerzoHH: [
      {
        Actividad: 'Analisis',
        Porcentaje: 4,
        Valor: 0,
      },
      {
        Actividad: 'Diseño',
        Porcentaje: 2,
        Valor: 0,
      },
      {
        Actividad: 'Programación',
        Porcentaje: 1,
        Valor: 0,
      },
      {
        Actividad: 'Pruebas',
        Porcentaje: 3,
        Valor: 0,
      },
      {
        Actividad: 'Gestión de Proyecto',
        Porcentaje: 5,
        Valor: 0,
      },
    ],
  };

  ResultadoUUCW = {
    CantidadSimple: 0,
    CantidadMedia: 0,
    CantidadCompleja: 0,
    UUCWTotal: 0,
    ListadoUUCW: [],
  };

  ResultadoUAW = {
    CantidadSimple: 0,
    CantidadMedia: 0,
    CantidadCompleja: 0,
    UAWTotal: 0,
    ListadoUAW: [],
  };

  ResultadoTCF = {
    TFactor: 0,
    FCTValue: 0,
    TCF: [],
  };

  ResultadoECF = {
    EFactor: 0,
    EFValue: 0,
    E1E6Menor: 0,
    E7E8Mayor: 0,
    FactoresAmb: [],
  };

  constructor(configRating: NgbRatingConfig) {
    configRating.max = 5;
    configRating.readonly = true;
  }

  ngOnInit() {
    this.ResultadoUUCW = JSON.parse(localStorage.getItem('ResultadoUUCW'));
    this.ResultadoUAW = JSON.parse(localStorage.getItem('ResultadoUAW'));
    this.ResultadoTCF = JSON.parse(localStorage.getItem('ResultadoTCF'));
    this.ResultadoECF = JSON.parse(localStorage.getItem('ResultadoECF'));
    this.CalculoECF();
    this.CalFactorHoraPersona();
    this.CalculoEfuerzoActividad();
  }

  CalculoECF() {
    //Limpiar el LocalStorage
    localStorage.removeItem('UCPFinal');

    this.UCPFinal =
      (this.ResultadoUUCW.UUCWTotal + this.ResultadoUAW.UAWTotal) *
      this.ResultadoTCF.FCTValue *
      this.ResultadoECF.EFValue;
    //Guardar en el LocalStorage
    localStorage.setItem('UCPFinal', JSON.stringify(this.UCPFinal));
  }

  CalFactorHoraPersona() {
    if (this.ResultadoECF.E7E8Mayor + this.ResultadoECF.E1E6Menor <= 2) {
      this.CalculoHorasHombre.FactorHoraPersona = 20;
    }
    if (
      this.ResultadoECF.E7E8Mayor + this.ResultadoECF.E1E6Menor <= 4 &&
      this.ResultadoECF.E7E8Mayor + this.ResultadoECF.E1E6Menor > 2
    ) {
      this.CalculoHorasHombre.FactorHoraPersona = 28;
    }
    if (this.ResultadoECF.E7E8Mayor + this.ResultadoECF.E1E6Menor >= 5) {
      this.CalculoHorasHombre.FactorHoraPersona = 36;
    }

    this.CalculoHorasHombre.CantidadHorasPersona =
      this.UCPFinal * this.CalculoHorasHombre.FactorHoraPersona;
  }

  CalculoEfuerzoActividad() {
    this.CalculoHorasHombre.EsfuerzoHH.forEach((elemento) => {
      elemento.Valor =
        this.CalculoHorasHombre.CantidadHorasPersona / elemento.Porcentaje;
      this.CalculoHorasHombre.HHTotal += elemento.Valor;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { element } from 'protractor';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'CalculoUCP',
  templateUrl: './CalculoUCP.component.html',
  styleUrls: ['./CalculoUCP.component.css'],
})
export class CalculoUCPComponent implements OnInit {
  title = 'Calculo UCP';

  UCPFinal: number = 0;

  documentDefinition = {
    content: [],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
      },
      subheader: {
        fontSize: 15,
        bold: true,
        alignment: 'center',
      },
      quote: {
        italics: true,
      },
      small: {
        fontSize: 8,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
  };

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

    this.CalculoHorasHombre.CantidadHorasPersona = parseFloat(
      (this.UCPFinal * this.CalculoHorasHombre.FactorHoraPersona).toFixed(2)
    );
  }

  CalculoEfuerzoActividad() {
    this.CalculoHorasHombre.EsfuerzoHH.forEach((elemento) => {
      elemento.Valor = parseFloat(
        (
          this.CalculoHorasHombre.CantidadHorasPersona / elemento.Porcentaje
        ).toFixed(2)
      );
      this.CalculoHorasHombre.HHTotal += elemento.Valor;
    });
  }

  public downloadAsPDF() {
    this.Parte1PDF();
    pdfMake.createPdf(this.documentDefinition).open();
  }

  public Parte1PDF() {
    let Enunciado = [
      {
        text: 'Resultados',
        style: 'header',
      },
      {
        text: '1. Factor de peso de los actores sin ajustar (UAW)',
        style: 'subheader',
      },
      {
        style: 'tableExample',
        table: {
          body: [
            [
              { text: '#', style: 'tableHeader' },
              { text: 'Actor', style: 'tableHeader' },
              { text: 'Complejidad', style: 'tableHeader' },
            ],
          ],
        },
      },
      {
        text: 'Conteo',
        style: 'subheader',
      },
      {
        style: 'tableExample',
        table: {
          body: [
            [
              { text: 'Complejidad', style: 'tableHeader' },
              { text: 'Cantidad', style: 'tableHeader' },
              { text: 'Factor', style: 'tableHeader' },
              { text: 'Total', style: 'tableHeader' },
            ],
          ],
        },
      },
    ];

    this.ResultadoUAW.ListadoUAW.forEach(function (elemento, index) {
      let complejidad = 'Simple';
      if (elemento.Complejidad == 1) {
        complejidad = 'Medio';
      }
      if (elemento.Complejidad == 2) {
        complejidad = 'Complejo';
      }
      let FilaTabla = [index, elemento.Nombre, complejidad];
      Enunciado[2].table.body.push(FilaTabla);
    });

    //let FilaSimple = ['Simple', this.ResultadoUAW.CantidadSimple, 5, this.ResultadoUAW.CantidadSimple*5];
    //Enunciado[4].table.body.push(FilaSimple);

    this.documentDefinition.content.push(Enunciado);
  }
}

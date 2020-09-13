import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

interface ComponenteTabla {
  Nombre: string;
  ConteoTotal: number;
  Simple: number;
  Media: number;
  Alta: number;
  ValorSimple: number;
  ValorMedia: number;
  ValorAlta: number;
  Total: number;
}

interface FactorAjusteValor {
  Nombre: string;
  Pregunta: string;
  Puntuacion: number;
}

interface ComponentesProyecto {
  Categoria: number;
  Nombre: string;
  Descripcion: string;
  Complejidad: number;
}

@Component({
  selector: 'PuntoFuncion',
  templateUrl: './PuntoFuncion.component.html',
  providers: [NgbRatingConfig],
  styleUrls: ['./PuntoFuncion.component.css'],
})
export class PuntoFuncionComponent {

  //Formularios de Componentes
  PuntoFuncionForm: FormGroup;
  SalidasExternasForm: FormGroup;
  ConsultasExternasForm: FormGroup;
  ArchivosLogicosInternosForm: FormGroup;
  ArchivosInterfazExternaForm: FormGroup;

  public model = 0;
  public title: string;
  public TotalFAV: number = 0;
  public TotalComplejidad: number = 0;
  public PuntosFuncionAjustados: number = 0;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    config: NgbRatingConfig
  ) {
    this.title = 'Puntos de Función';
    config.max = 5;
    this.PuntoFuncionForm = this.fb.group({
      EntradaExterna: this.fb.array([]),
    });
  }

  FAV: FactorAjusteValor[] = [
    {
      Nombre: 'Respaldo y recuperación',
      Pregunta: '¿El sistema requiere respaldo y recuperación confiables?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Comunicaciones de datos ',
      Pregunta:
        '¿Se requieren comunicaciones de datos especializadas para transferir información hacia o desde la aplicación?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Procesamiento distribuido ',
      Pregunta: ' ¿Existen funciones de procesamiento distribuidas?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Rendimiento crítico ',
      Pregunta: '¿El desempeño es crucial?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Existencia de entorno operativo ',
      Pregunta:
        '¿El sistema correrá en un entorno operativo existente enormemente utilizado?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Entrada de datos en línea ',
      Pregunta: '¿El sistema requiere entrada de datos en línea?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Transacción de entrada sobre múltiples pantallas ',
      Pregunta:
        '¿La entrada de datos en línea requiere que la transacción de entrada se construya sobre múltiples pantallas u operaciones?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Archivos maestros actualizados en línea ',
      Pregunta: '¿Los ALI se actualizan en línea?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Complejo de valores de dominio de información ',
      Pregunta: '¿Las entradas, salidas, archivos o consultas son complejos?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Complejo de procesamiento interno ',
      Pregunta: '¿El procesamiento interno es complejo?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Código diseñado para reuso ',
      Pregunta: '¿El código se diseña para ser reutilizable?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Conversión/instalación en diseño ',
      Pregunta: '¿La conversión y la instalación se incluyen en el diseño?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Instalaciones múltiples ',
      Pregunta:
        '¿El sistema se diseña para instalaciones múltiples en diferentes organizaciones?',
      Puntuacion: 0,
    },
    {
      Nombre: 'Aplicación diseñada para cambio ',
      Pregunta:
        '¿La aplicación se diseña para facilitar el cambio y su uso por parte del usuario?',
      Puntuacion: 0,
    },
  ];

  ConteoComplejidad: ComponenteTabla[] = [
    {
      Nombre: 'Entrada Externa',
      ConteoTotal: 0,
      Simple: 0,
      Media: 0,
      Alta: 0,
      Total: 0,
      ValorSimple: 3,
      ValorMedia: 4,
      ValorAlta: 6,
    },
    {
      Nombre: 'Salida Externa',
      ConteoTotal: 0,
      Simple: 0,
      Media: 0,
      Alta: 0,
      Total: 0,
      ValorSimple: 4,
      ValorMedia: 5,
      ValorAlta: 7,
    },
    {
      Nombre: 'Consulta Externa',
      ConteoTotal: 0,
      Simple: 0,
      Media: 0,
      Alta: 0,
      Total: 0,
      ValorSimple: 3,
      ValorMedia: 4,
      ValorAlta: 6,
    },
    {
      Nombre: 'Archivos lógicos internos',
      ConteoTotal: 0,
      Simple: 0,
      Media: 0,
      Alta: 0,
      Total: 0,
      ValorSimple: 7,
      ValorMedia: 10,
      ValorAlta: 15,
    },
    {
      Nombre: 'Archivos de interfaz externos',
      ConteoTotal: 0,
      Simple: 0,
      Media: 0,
      Alta: 0,
      Total: 0,
      ValorSimple: 5,
      ValorMedia: 7,
      ValorAlta: 10,
    },
  ];

  get EntradaExterna(): FormArray {
    return this.PuntoFuncionForm.get('EntradaExterna') as FormArray;
  }

  NuevaEntradaExterna(): FormGroup {
    return this.fb.group({
      Nombre: '',
      Complejidad: '',
      Descripcion: '',
    });
  }

  AgregarEntradaExterna() {
    this.EntradaExterna.push(this.NuevaEntradaExterna());
  }

  removerProducto(i: number) {
    this.EntradaExterna.removeAt(i);
  }

  EliminarPuntuacion(index: number) {
    this.FAV[index].Puntuacion = 0;
    this.SumatoriaFAV();
  }

  SumatoriaFAV() {
    this.TotalFAV = 0;
    this.FAV.forEach((element) => {
      this.TotalFAV += element.Puntuacion;
    });
  }

  CalculoPFA(ConteoTotal: number, SumFAV: number) {
    this.PuntosFuncionAjustados = ConteoTotal * (0.65 + 0.01 * SumFAV);
  }

  onSubmit() {
    console.log('TEST');
  }
}

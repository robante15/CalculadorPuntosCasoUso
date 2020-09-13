import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface TiposCasosUso {
  TipoActor: string;
  Descripcion: string;
  Factor: number;
}

interface ListadoActores {
  Nombre: string;
  Complejidad: number;
}

@Component({
  selector: 'FactorUUCW',
  templateUrl: './FactorUUCW.component.html',
  styleUrls: ['./FactorUUCW.component.css'],
})
export class FactorUUCWComponent {
  title = 'Factor de peso de los casos de uso sin ajustar';

  ResultadoUUCW = {
    CantidadSimple: 0,
    CantidadMedia: 0,
    CantidadCompleja: 0,
    UUCWTotal: 0,
    ListadoUUCW: [],
  };

  //Formularios de Componentes
  CasosDeUsoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.CasosDeUsoForm = this.fb.group({
      CDUso: this.fb.array([]),
    });
  }

  get ActorSimple(): FormArray {
    return this.CasosDeUsoForm.get('CDUso') as FormArray;
  }

  NuevoActorSimple(): FormGroup {
    return this.fb.group({
      Nombre: '',
      Complejidad: 0,
    });
  }

  AgregarActorSimple() {
    this.ActorSimple.push(this.NuevoActorSimple());
  }

  RemoverActorSimple(i: number) {
    this.ActorSimple.removeAt(i);
  }

  CalculoUAW() {
    //Reiniciar el Array
    this.ResultadoUUCW = {
      CantidadSimple: 0,
      CantidadMedia: 0,
      CantidadCompleja: 0,
      UUCWTotal: 0,
      ListadoUUCW: [],
    };

    //Limpiar el LocalStorage
    localStorage.removeItem('ResultadoUUCW');

    //Contador de Complejidad de los elementos
    this.CasosDeUsoForm.value.CDUso.forEach((element) => {
      switch (element.Complejidad) {
        case '0':
          this.ResultadoUUCW.CantidadSimple += 1;
          break;
        case '1':
          this.ResultadoUUCW.CantidadMedia += 1;
          break;
        case '2':
          this.ResultadoUUCW.CantidadCompleja += 1;
          break;
      }

      //Guarda el listado de Actores con su Nombre y Complejidad
      let ActorFormulario: ListadoActores = {
        Nombre: element.Nombre,
        Complejidad: element.Complejidad,
      };
      this.ResultadoUUCW.ListadoUUCW.push(ActorFormulario);
    });

    //Calculo UAW Total
    this.ResultadoUUCW.UUCWTotal =
      this.ResultadoUUCW.CantidadSimple * this.BasadoTransacciones[0].Factor +
      this.ResultadoUUCW.CantidadMedia * this.BasadoTransacciones[1].Factor +
      this.ResultadoUUCW.CantidadCompleja * this.BasadoTransacciones[2].Factor;

    //Guardar resultado en el LocalStorage
    localStorage.setItem('ResultadoUUCW', JSON.stringify(this.ResultadoUUCW));
  }

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

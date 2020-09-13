import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface TiposActores {
  TipoActor: string;
  Descripcion: string;
  Factor: number;
}

interface ListadoActores {
  Nombre: string;
  Complejidad: number;
}

@Component({
  selector: 'FactorUAW',
  templateUrl: './factor-uaw.component.html',
  styleUrls: ['./factor-uaw.component.css'],
})
export class FactorUAWComponent {
  title = 'Factor de peso de los actores sin ajustar (UAW)';
  ResultadoUAW = {
    CantidadSimple: 0,
    CantidadMedia: 0,
    CantidadCompleja: 0,
    UAWTotal: 0,
    ListadoUAW: [],
  };

  //Formularios de Componentes
  ActoresForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ActoresForm = this.fb.group({
      FSimples: this.fb.array([]),
    });
  }

  get ActorSimple(): FormArray {
    return this.ActoresForm.get('FSimples') as FormArray;
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
    this.ResultadoUAW = {
      CantidadSimple: 0,
      CantidadMedia: 0,
      CantidadCompleja: 0,
      UAWTotal: 0,
      ListadoUAW: [],
    };

    //Limpiar el LocalStorage
    localStorage.removeItem('ResultadoUAW');

    //Contador de Complejidad de los elementos
    this.ActoresForm.value.FSimples.forEach((element) => {
      switch (element.Complejidad) {
        case '0':
          this.ResultadoUAW.CantidadSimple += 1;
          break;
        case '1':
          this.ResultadoUAW.CantidadMedia += 1;
          break;
        case '2':
          this.ResultadoUAW.CantidadCompleja += 1;
          break;
      }

      //Guarda el listado de Actores con su Nombre y Complejidad
      let ActorFormulario: ListadoActores = {
        Nombre: element.Nombre,
        Complejidad: element.Complejidad,
      };
      this.ResultadoUAW.ListadoUAW.push(ActorFormulario);
    });

    //Calculo UAW Total
    this.ResultadoUAW.UAWTotal =
      this.ResultadoUAW.CantidadSimple * this.ListadoTipoActores[0].Factor +
      this.ResultadoUAW.CantidadMedia * this.ListadoTipoActores[1].Factor +
      this.ResultadoUAW.CantidadCompleja * this.ListadoTipoActores[2].Factor;

    //Guardar resultado en el LocalStorage
    localStorage.setItem('ResultadoUAW', JSON.stringify(this.ResultadoUAW));
  }

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
}

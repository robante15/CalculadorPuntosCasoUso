import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { FactoresCTComponent } from './components/FactoresCT/FactoresCT.component';
import { FactoresAmbientalesComponent } from './components/FactoresECF/FactoresAmbientales.component';
import { FactorUAWComponent } from './components/FactorUAW/factor-uaw.component';
import { FactorUUCWComponent } from './components/FactorUUCW/FactorUUCW.component';
import { CalculoUCPComponent } from './components/CalculoUCP/CalculoUCP.component';
import { PuntosCUComponent } from './components/PuntosCU/PuntosCU.component';
import { AyudaComponent } from './components/Ayuda/ayuda.component';

const routes: Routes = [
  { path: '', redirectTo: '/Inicio', pathMatch: 'full' },
  { path: 'Inicio', component: InicioComponent },
  { path: 'FactoresTCF', component: FactoresCTComponent },
  {
    path: 'FactoresECF',
    component: FactoresAmbientalesComponent,
  },
  { path: 'FactoresUAW', component: FactorUAWComponent },
  { path: 'FactoresUUCW', component: FactorUUCWComponent },
  { path: 'CalculoUCP', component: CalculoUCPComponent },
  { path: 'PuntosCU', component: PuntosCUComponent },
  { path: 'Ayuda', component: AyudaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

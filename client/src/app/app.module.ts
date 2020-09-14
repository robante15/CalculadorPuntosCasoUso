import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FactoresCTComponent } from './components/FactoresCT/FactoresCT.component';
import { FactoresAmbientalesComponent } from './components/FactoresECF/FactoresAmbientales.component';
import { FactorUAWComponent } from './components/FactorUAW/factor-uaw.component';
import { FactorUUCWComponent } from './components/FactorUUCW/FactorUUCW.component';
import { CalculoUCPComponent } from './components/CalculoUCP/CalculoUCP.component';
import { PuntosCUComponent } from './components/PuntosCU/PuntosCU.component';
import { AyudaComponent } from './components/Ayuda/ayuda.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    FactoresCTComponent,
    FactoresAmbientalesComponent,
    FactorUAWComponent,
    FactorUUCWComponent,
    CalculoUCPComponent,
    PuntosCUComponent,
    AyudaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent],
})
export class AppModule {}

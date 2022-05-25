import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMasPageRoutingModule } from './ver-mas-routing.module';

import { VerMasPage } from './ver-mas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMasPageRoutingModule
  ],
  declarations: [VerMasPage]
})
export class VerMasPageModule {}

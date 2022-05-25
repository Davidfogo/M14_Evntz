import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerMasPage } from './ver-mas.page';

const routes: Routes = [
  {
    path: '',
    component: VerMasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerMasPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuiaDetalharPage } from './guia-detalhar.page';

const routes: Routes = [
  {
    path: '',
    component: GuiaDetalharPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GuiaDetalharPage]
})
export class GuiaDetalharPageModule {}

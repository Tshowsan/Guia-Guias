import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuiaCadastrarPage } from './guia-cadastrar.page';

const routes: Routes = [
  {
    path: '',
    component: GuiaCadastrarPage
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
  declarations: [GuiaCadastrarPage]
})
export class GuiaCadastrarPageModule {}

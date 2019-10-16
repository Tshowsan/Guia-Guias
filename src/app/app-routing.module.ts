import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guia-login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'guia-cadastrar', loadChildren: './pages/guia/guia-cadastrar/guia-cadastrar.module#GuiaCadastrarPageModule' },
  { path: 'guia-login', loadChildren: './pages/guia/guia-login/guia-login.module#GuiaLoginPageModule' },  { path: 'guia-editar', loadChildren: './pages/guia/guia-editar/guia-editar.module#GuiaEditarPageModule' },
  { path: 'guia-detalhar', loadChildren: './pages/guia/guia-detalhar/guia-detalhar.module#GuiaDetalharPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

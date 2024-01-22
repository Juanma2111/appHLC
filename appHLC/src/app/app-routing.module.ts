import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { NotasPage } from './pages/notas/notas.page';

const routes: Routes = [
  {
    path: '',
    //component: HomePage
    loadChildren: () => import('./pages/home/home.module').then ( m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'notas',
    //component: NotasPage
    loadChildren: () => import('./pages/notas/notas.module').then( m => m.NotasPageModule)
  },
  {
    path: 'notas/:id',
    loadChildren: () => import('./pages/notas/notas.module').then( m => m.NotasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

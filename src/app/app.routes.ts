import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { DetalheProdutoComponent } from './pages/detalhe-produto/detalhe-produto.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';
import { ProductFormComponent } from './pages/admin/product-form/product-form.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { adminGuard } from './guards/admin.guard';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { BuscaComponent } from './pages/busca/busca.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'categoria/:nome', component: CategoriaComponent },
    { path: 'produto/:id', component: DetalheProdutoComponent },
    { path: 'carrinho', component: CarrinhoComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: 'busca', component: BuscaComponent },
    { path: 'admin', component: AdminLayoutComponent,
      canActivate: [adminGuard],
      children: [
        { path: 'list', component: ProductListComponent },
        { path: 'create', component: ProductFormComponent },
        { path: 'edit/:id', component: ProductFormComponent },
        { path: '', redirectTo: 'list', pathMatch: 'full' },
      ] },
    { path: '**', redirectTo: '' }
];
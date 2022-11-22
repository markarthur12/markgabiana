import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'categories',
                component: CategoriesListComponent,
            },
            {
                path: 'categories/new-form',
                component: CategoriesFormComponent,
            },
            {
                path: 'categories/new-form/:id',
                component: CategoriesFormComponent,
            },
            {
                path: 'products',
                component: ProductListComponent,
            },
            {
                path: 'products/new-form',
                component: ProductFormComponent,
            },
            {
                path: 'products/new-form/:id',
                component: ProductFormComponent,
            },
            {
                path: 'users',
                component: UsersListComponent,
            },
            {
                path: 'users/new-form',
                component: UsersFormComponent,
            },
            {
                path: 'users/new-form/:id',
                component: UsersFormComponent,
            },
        ]
    },
];

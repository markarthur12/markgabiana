import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

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
        ]
    },
];

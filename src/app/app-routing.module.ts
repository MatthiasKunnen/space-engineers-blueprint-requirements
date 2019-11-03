import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './error/not-found/not-found.component';
import {
    RequirementExtractorComponent,
} from './requirement-extractor/requirement-extractor.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: RequirementExtractorComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

import { Routes } from '@angular/router';
import { CardInfoComponent } from './components/card-info/card-info.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [
    { path: '', component: CardComponent },
    { path: 'card/:id', component: CardInfoComponent }
];

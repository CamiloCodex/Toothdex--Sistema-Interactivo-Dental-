import { Routes } from '@angular/router';
import { IntroPageComponent } from './screens/intro-page/intro-page.component';
import { HomePageComponent } from './screens/home-page/home-page.component';

export default [
  {
    path: '',
    children: [
      {
        path: 'intro',
        component: IntroPageComponent,
      },
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: '**',
        redirectTo: 'intro',
      },
    ],
  },
] as Routes;

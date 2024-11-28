import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './intro-page.component.html',
  styles: `
  .h-all {
    min-width: 100%;
    min-height: 100vh;
  }
  `,
})
export class IntroPageComponent implements OnInit {
  #router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.#router.navigate(['./public/home']);
    }, 1500);
  }
}

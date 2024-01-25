import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  afterNextRender,
  afterRender,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h1>Angular SSR / SSG / a</h1>
    <input
      type="text"
      #newValueInput
      (input)="newValue.set(newValueInput.value)"
    />
  `,
})
export class AppComponent {
  public newValue = signal('');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(1, localStorage.getItem('value'));
    }

    if (isPlatformServer(this.platformId)) {
      console.log(2, 'Dener');
    }

    /*
      afterNextRender – executa uma vez e é semelhante ao AfterViewInit,
      mas não executa na renderização do lado do servidor (SSR)
    */
    afterNextRender(() => {
      console.log(1, 'afterNextRender');
    });

    // afterRender – executa após cada detecção de alteração
    afterRender(() => {
      console.log(2, 'afterRender');
      console.log(3, 'afterRender newValue', this.newValue());
    });
  }
}

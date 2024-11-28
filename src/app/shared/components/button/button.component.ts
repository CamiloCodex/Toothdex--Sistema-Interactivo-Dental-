import { Component, Input } from '@angular/core';
import { PrimeNg_Modules } from '@shared/library/primeng';

@Component({
  selector: 'shared-button',
  standalone: true,
  imports: [PrimeNg_Modules],
  templateUrl: './button.component.html',
  styles: ``,
})
export class ButtonComponent {
  @Input({ required: true }) label: string = 'Text Button';
  @Input() color: "primary" | "danger" | "info" | "success" | "secondary" | "warning" | "contrast" | "help" = 'primary' ; // primary, secondary, success, info, warning, danger
  @Input() icon: string = '';
  @Input() rounded: boolean = false;
  @Input() outlined: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}

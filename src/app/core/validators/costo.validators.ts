import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function abonoNoMayorQueCosto(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const servicioControl = control.get('costoServicio');
    const abonoControl = control.get('abono');

    if (!servicioControl || !abonoControl) {
      return null;
    }

    const costoServicio = servicioControl.value;
    const abono = abonoControl.value;

    return abono !== null && costoServicio !== null && abono > costoServicio
      ? { abonoMayorQueCosto: true }
      : null;
  };
}

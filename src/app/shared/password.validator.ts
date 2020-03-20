import {AbstractControl} from '@angular/forms';

export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const passwordCntrl = control.get('password');
  const confirmPasswordCntrl = control.get('confirmPassword');

  if (passwordCntrl.pristine || confirmPasswordCntrl.pristine) {
    return null;
  }

  // if passwordCntrl !=null && confirmPasswordCntrl!=null &&...
  return passwordCntrl && confirmPasswordCntrl && passwordCntrl.value !== confirmPasswordCntrl.value ?
    {'mismatch': true} : null;
}

import {AbstractControl} from '@angular/forms';

/*
 :{ [key: string]: any } | null
 means, this function returns object where:
    key is string and value is of any type
 or this function return null if validation passed
 */
export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
  // admin is forbidden word to be used as a name
  const forbidden = /admin/.test(control.value);

  return forbidden ? {'forbiddenName': {value: control.value}} : null;
}

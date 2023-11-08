import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noHerrera(control: FormControl ): {[s: string ]: boolean | any } {


    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      }
    }

    return {noHerrera: null};
  }
}

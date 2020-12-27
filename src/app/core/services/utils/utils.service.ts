// Angular modules.
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UtilsService {

  // Constructor method.
  constructor() {}

  // Get only numbers from currency.
  public getCurrencyValue(val: string): string {

    if (val.includes('R$ ')) {
      return val.replace('R$ ', '');
    }

    return val;

  }

}

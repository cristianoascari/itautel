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

  // Ensure value with decimal places.
  public setDecimalPlaces(val: string): string {

    if (!val.includes(',')) {
      val += ',00';
    } else {
      const ar: string[] = val.split(',');
      if (ar[1].length === 1) {
        ar[1] += '0';
      }
      val = ar[0] + ',' + ar[1];
    }
    return val;

  }

}

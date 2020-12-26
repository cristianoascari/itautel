// Angular modules.
import { Injectable } from '@angular/core';

// RxJS.
import { Observable, Subject } from 'rxjs';

// Enumerators.
import { EBroadcast } from '@app/core/models';

// Interfaces.
import { IBroadcast } from '@app/core/models';

@Injectable({ providedIn: 'root' })
export class BroadcastService {

  protected subject: Subject<IBroadcast> = new Subject<IBroadcast>();
  public events: Observable<IBroadcast> = this.subject.asObservable();

  // Constructor method.
  constructor() {}

  // Send a broadcast message.
  public sendBroadcast(key: EBroadcast, value?: any): void {

    this.subject.next({ key, value });

  }

}

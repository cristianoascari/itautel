// Angular modules.
import { Component } from '@angular/core';

// App interfaces.
import { IRequest } from '@app/core';

// App services.
import { RequestService } from '@app/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  // Status.
  public isLoading: boolean = false;

  // Constructor method.
  constructor(private requestService: RequestService) {}

}

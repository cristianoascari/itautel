// Angular modules.
import { Component, Input, OnInit } from '@angular/core';

// App interfaces.
import { IRequest } from '@app/core';

// App services.
import { RequestService } from '@app/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // Request data.
  @Input() request: IRequest = this.buildRequest(true);

  // Status.
  public isLoading: boolean = false;
  public isSaving: boolean = false;

  // Constructor method.
  constructor(private requestService: RequestService) {}

  // On init.
  public ngOnInit(): void {}

  // Save request.
  public save(): void {

    this.isSaving = true;

    if (this.validateRequest()) {

      

    } else {

      this.isSaving = false;

    }

  }

  // Validate request.
  private validateRequest(): boolean {

    let isValid: boolean = true;

    return isValid;

  }

  // Build new request.
  private buildRequest(onlyIfNew: boolean = true): IRequest {

    let r: IRequest = this.request;

    if (!onlyIfNew || (!this.request || !this.request._id)) {

      r = {
        cnpj: null,
        data: new Date(),
        empresa: null,
        minutos: null,
        plano: null,
        tarifa: null,
        valor: null,
        _id: null
      };

    }

    return r;

  }

}

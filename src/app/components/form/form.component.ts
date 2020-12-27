// Angular modules.
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App enumerators.
import { EPlan } from '@app/core';

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

  // Form.
  public formData: any = null;
  public controls: FormControl = null;
  public activeDate: string = null;

  // Plans.
  public plans: any[] = [];
  public plansOptions: any = EPlan;

  // Status.
  public isLoading: boolean = true;
  public isSaving: boolean = false;

  // Constructor method.
  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    protected translate: TranslateService
  ) {}

  // On init.
  public ngOnInit(): void {

    // Build form data.
    this.buildFormGroup();

    // Get available plans.
    this.plans = Object.keys(this.plansOptions).filter(String);

  }

  // Save request.
  public save(): void {

    this.isSaving = true;

    if (this.formData.dirty && this.formData.valid) {

      

    } else {

      this.isSaving = false;

    }

  }

  // Build form group.
  private buildFormGroup(): void {

    this.formData = this.fb.group({
      cnpj: [this.request.cnpj, [Validators.required, Validators.minLength(3)]],
      dataAd: [this.request.data, Validators.required],
      empresa: [this.request.empresa, Validators.required],
      minutos: [this.request.minutos, Validators.required],
      plano: [this.request.plano, Validators.required],
      tarifa: [this.request.tarifa, Validators.required],
      valor: [this.request.valor, Validators.required]
    });
    this.controls = this.formData.controls;

    const d: Date = this.formData.get('dataAd').value;
    this.activeDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); 

    this.isLoading = false;

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

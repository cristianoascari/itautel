// Angular modules.
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App enumerators.
import { EPlan } from '@app/core';

// App interfaces.
import { IRequest } from '@app/core';

// App services.
import { RequestService, UtilsService } from '@app/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges, OnInit {

  // Outputs.
  @Output() cancelEditRequest: EventEmitter<any> = new EventEmitter<any>();

  // Request data.
  public newReq: boolean = true;
  @Input() request: IRequest = this.buildRequest(true);

  // Form.
  public formData: any = null;
  public controls: FormControl = null;

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
    protected translate: TranslateService,
    protected utilsService: UtilsService
  ) {}

  // On changes.
  public ngOnChanges(): void {

    if (this.request && this.request._id && this.request._id !== this.formData.get('_id').value) {
      this.buildFormGroup();
    }

  }

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

      this.request = {
        cnpj: this.formData.get('cnpj').value,
        dataAd: this.formData.get('dataAd').value,
        dataEnv: new Date(),
        empresa: this.formData.get('empresa').value,
        minutos: this.formData.get('minutos').value,
        plano: this.formData.get('plano').value,
        tarifa: this.utilsService.getCurrencyValue(this.formData.get('tarifa').value),
        valor: this.utilsService.getCurrencyValue(this.formData.get('valor').value),
        _id: this.request._id || null
      };

      if (this.request._id) {

        this.requestService.updateRequest(this.request)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => this.isSaving = false);

      } else {

        this.requestService.createRequest(this.request)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => this.isSaving = false);

      }

    } else {

      this.isSaving = false;

    }

  }

  // Build form group.
  private buildFormGroup(): void {

    const r: IRequest = this.request;
    this.formData = this.fb.group({
      _id: [r ? r._id : null],
      cnpj: [r ? r.cnpj : null, [Validators.required, Validators.minLength(3)]],
      dataAd: [r ? r.dataAd : new Date(), Validators.required],
      empresa: [r ? r.empresa : null, Validators.required],
      minutos: [r ? r.minutos : null, Validators.required],
      plano: [r ? r.plano : null, Validators.required],
      tarifa: [r ? r.tarifa : null, Validators.required],
      valor: [r ? r.valor : null, Validators.required]
    });
    this.controls = this.formData.controls;

    this.newReq = r && r._id ? false : true;

    const d: Date = this.formData.get('dataAd').value;
    this.formData.get('dataAd').setValue(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate());

    this.isLoading = false;

  }

  // Build new request.
  private buildRequest(onlyIfNew: boolean = true): IRequest {

    let r: IRequest = this.request;

    if (!onlyIfNew || (!this.request || !this.request._id)) {

      r = {
        cnpj: null,
        dataAd: new Date(),
        dataEnv: new Date(),
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

  // Cancel edit.
  public cancelEdit(): void {

    this.request = null;
    this.buildRequest();
    this.buildFormGroup();
    this.cancelEditRequest.emit();

  }

}

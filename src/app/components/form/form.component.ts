// Angular modules.
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App environment.
import { environment } from '@env/environment';

// App enumerators.
import { EBroadcast, EPlan } from '@app/core';

// App interfaces.
import { IRequest } from '@app/core';

// App services.
import { BroadcastService, RequestService, UtilsService } from '@app/core';

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
    private broadcastService: BroadcastService,
    private fb: FormBuilder,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
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

    if (this.formData.valid) {

      this.request = {
        cnpj: this.formData.get('cnpj').value,
        dataAd: this.formData.get('dataAd').value,
        dataEnv: new Date(),
        empresa: this.formData.get('empresa').value,
        minutos: this.formData.get('minutos').value,
        plano: this.formData.get('plano').value,
        tarifa: this.utilsService.getCurrencyValue(this.formData.get('tarifa').value),
        valor: this.utilsService.getCurrencyValue(this.formData.get('valor').value),
        _id: this.request && this.request._id ? this.request._id : null
      };

      if (this.request._id) {

        this.requestService.updateRequest(this.request)
        .then(res => {
          if (!environment.production) { console.log(res); }
          this.snackBar.open(this.translate.instant('REQUESTS.MESSAGES.UPDATED'), 'OK', {duration: 4000});
          this.cancelEdit();
          this.broadcastService.sendBroadcast(EBroadcast.RequestUpdate, 'update');
        })
        .catch(err => {
          if (!environment.production) { console.log(err); }
          this.snackBar.open(err.message || this.translate.instant('REQUESTS.MESSAGES.UNKNOWN'), 'OK');
        })
        .finally(() => this.isSaving = false);

      } else {

        this.requestService.createRequest(this.request)
        .then(res => {
          if (!environment.production) { console.log(res); }
          this.snackBar.open(this.translate.instant('REQUESTS.MESSAGES.CREATED'), 'OK', {duration: 4000});
          this.resetForm();
          this.broadcastService.sendBroadcast(EBroadcast.RequestUpdate, 'new');
        })
        .catch(err => {
          if (!environment.production) { console.log(err); }
          this.snackBar.open(err.message || this.translate.instant('REQUESTS.MESSAGES.UNKNOWN'), 'OK');
        })
        .finally(() => this.isSaving = false);

      }

    } else {

      this.isSaving = false;

    }

  }

  // Build form group.
  private buildFormGroup(): void {

    const r: IRequest = this.request;

    if (r && r.dataAd) {
      const arData: string[] = r.dataAd.toString().split('-');
      r.dataAd = new Date(parseInt(arData[0], 10), parseInt(arData[1], 10) - 1, parseInt(arData[2], 10));
    }

    this.formData = this.fb.group({
      _id: [r ? r._id : null],
      cnpj: [r ? r.cnpj : null, [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      dataAd: [r ? r.dataAd : new Date(), Validators.required],
      empresa: [r ? r.empresa : null, Validators.required],
      minutos: [r ? r.minutos : null, Validators.required],
      plano: [r ? r.plano : null, Validators.required],
      tarifa: [r ? r.tarifa : null, Validators.required],
      valor: [r ? r.valor : null, Validators.required]
    });
    this.controls = this.formData.controls;

    this.newReq = r && r._id ? false : true;

    const dt: Date = this.formData.get('dataAd').value;
    this.formData.get('dataAd').setValue(dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate());

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

    this.isLoading = true;
    this.resetForm();
    this.cancelEditRequest.emit();

  }

  // Reset form.
  private resetForm(): void {

    this.formData.reset();
    this.formData = null;

    this.request = null;
    this.buildRequest();
    this.buildFormGroup();

    this.formData.controls.cnpj.setErrors(null)
    this.formData.controls.dataAd.setErrors(null);
    this.formData.controls.empresa.setErrors(null);
    this.formData.controls.minutos.setErrors(null);
    this.formData.controls.plano.setErrors(null);
    this.formData.controls.tarifa.setErrors(null);
    this.formData.controls.valor.setErrors(null);

  }

}

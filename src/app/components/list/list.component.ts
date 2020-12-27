// Angular modules.
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App environment.
import { environment } from '@env/environment';

// App interfaces.
import { IRequest } from '@app/core';

// App services.
import { RequestService } from '@app/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // Outputs.
  @Output() editRequest: EventEmitter<IRequest> = new EventEmitter<IRequest>();

  // Requests.
  public requests: IRequest[] = [];

  // Table.
  public displayedColumns: string[] = this.buildTableColumns();

  // Status.
  public isLoading: boolean = true;
  public isSaving: boolean = false;

  // Constructor method.
  constructor(
    private dialog: MatDialog,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    protected translate: TranslateService
  ) {}

  // On init.
  public ngOnInit(): void {

    this.requests.push({_id: '123', dataEnv: new Date(), valor: '190,00', cnpj: '12.334.433/2999-44', dataAd: new Date(), empresa: 'ABC', minutos: 300, plano: 'P30', tarifa: '150,00'});
    this.requests.push({_id: '456', dataEnv: new Date(), valor: '190,00', cnpj: '12.334.433/2999-55', dataAd: new Date(), empresa: 'DEF', minutos: 300, plano: 'P60', tarifa: '150,00'});
    this.requests.push({_id: '789', dataEnv: new Date(), valor: '190,00', cnpj: '12.334.433/2999-66', dataAd: new Date(), empresa: 'GHI', minutos: 300, plano: 'P120', tarifa: '150,00'});
    this.requests.push({_id: '101', dataEnv: new Date(), valor: '190,00', cnpj: '12.334.433/2999-77', dataAd: new Date(), empresa: 'JKL', minutos: 300, plano: 'P30', tarifa: '150,00'});
    this.requests.push({_id: '102', dataEnv: new Date(), valor: '190,00', cnpj: '12.334.433/2999-88', dataAd: new Date(), empresa: 'MNO', minutos: 300, plano: 'P30', tarifa: '150,00'});
    setTimeout(() => { this.isLoading = false; }, 1500);

  }

  // Edit selected item.
  public edit(id: string): void {

    const r: IRequest = this.requests.find(i => i._id === id);
    if (r) { this.editRequest.emit(r); }

  }

  // Delete selected item.
  public delete(id: string): void {

    const r: IRequest = this.requests.find(i => i._id === id);

    if (r) {

      const dialogRef = this.dialog.open(ListDialogComponent, {data: r});
      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          this.isSaving = true;
          this.requestService.deleteRequest(id)
          .then(res => {
            if (!environment.production) { console.log(res); }
            this.snackBar.open('Requisição excluída com sucesso!', 'OK', {duration: 4000});
          })
          .catch(err => {
            if (!environment.production) { console.log(err); }
            this.snackBar.open(err.message || 'Ocorreu um erro na requisição', 'OK');
          })
          .finally(() => this.isSaving = false);

        }
      });

    }

  }

  // Build table columns.
  private buildTableColumns(): string[] {

    const cols: string[] = [];
    cols.push(this.translate.instant('REQUESTS.FIELDS.ID'));
    cols.push(this.translate.instant('REQUESTS.FIELDS.COMPANY'));
    cols.push(this.translate.instant('REQUESTS.FIELDS.PLAN'));
    cols.push(this.translate.instant('REQUESTS.FIELDS.TAX'));
    cols.push(this.translate.instant('REQUESTS.FIELDS.MINUTES'));
    cols.push(this.translate.instant('REQUESTS.FIELDS.PLAN_VALUE'));
    cols.push(this.translate.instant('REQUESTS.FIELDS.ENTRY_DATE'));
    cols.push(this.translate.instant('REQUESTS.FIELDS.SEND_DATE'));
    cols.push(this.translate.instant('REQUESTS.FIELDS.ACTION'));
    return cols;

  }

}

// Dialog component.
@Component({
  selector: 'app-list-dialog',
  templateUrl: 'list-dialog.html',
})
export class ListDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public request: IRequest
  ) {}

}

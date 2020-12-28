// Angular modules.
import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App environment.
import { environment } from '@env/environment';

// App enumerators.
import { EBroadcast } from '@app/core';

// App interfaces.
import { IRequest } from '@app/core';

// App services.
import { BroadcastService, RequestService } from '@app/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit {

  @ViewChild(MatSort) sort: MatSort;

  // Outputs.
  @Output() editRequest: EventEmitter<IRequest> = new EventEmitter<IRequest>();

  // Requests.
  public requests: IRequest[] = [];

  // Table.
  public displayedColumns: string[] = this.buildTableColumns();
  public dataSource: any = new MatTableDataSource(this.requests);

  // Status.
  public isLoading: boolean = true;
  public isSaving: boolean = false;

  // Constructor method.
  constructor(
    private broadcastService: BroadcastService,
    private dialog: MatDialog,
    private requestService: RequestService,
    private snackBar: MatSnackBar,
    protected translate: TranslateService
  ) {}

  // After view init.
  public ngAfterViewInit(): void { this.dataSource.sort = this.sort; }

  // On init.
  public ngOnInit(): void {

    // List to broadcasts.
    this.listenToBroadcast();

    // Get all requests.
    this.getRequests(true);

  }

  // Get all requests.
  private getRequests(loader: boolean = true): void {

    this.isLoading = loader;
    this.requestService.getRequests()
    .then(res => {
      this.requests = res as IRequest[];
      this.requests.sort((a, b) => (a.empresa > b.empresa) ? 1 : ((b.empresa > a.empresa) ? -1 : 0));
      this.dataSource = new MatTableDataSource(this.requests);
      this.dataSource.sort = this.sort;
    })
    .catch(err => {
      if (!environment.production) { console.log(err); }
      this.snackBar.open(err.message || 'Ocorreu um erro na requisição', 'OK');
    })
    .finally(() => this.isLoading = false);

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
            this.snackBar.open(this.translate.instant('REQUESTS.MESSAGES.DELETED'), 'OK', {duration: 4000});
            this.getRequests(false);
          })
          .catch(err => {
            if (!environment.production) { console.log(err); }
            this.snackBar.open(err.message || this.translate.instant('REQUESTS.MESSAGES.UNKNOWN'), 'OK');
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

  // Listen to broadcast events.
  private listenToBroadcast(): void {

    this.broadcastService.events.subscribe(ev => {

      switch (ev.key) {

        // New/updated request.
        case EBroadcast.RequestUpdate: this.getRequests(false); break;

      }

    });

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

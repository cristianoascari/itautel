// Angular modules.
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App enumerators.
import { EBroadcast } from '@app/core';

// App interfaces.
import { IUser } from '@app/core';

// App services.
import { AuthService, BroadcastService } from '@app/core';

// App components.
import { HelpComponent } from '@app/components/help/help.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // Logged user.
  public user: IUser = this.authService.getLoggedUser();
  public abbrName: string = this.getInitials();

  // Status.
  public isLoading: boolean = true;

  // Constructor method.
  constructor(
    private authService: AuthService,
    private broadcastService: BroadcastService,
    private helpDialog: MatDialog,
    protected translate: TranslateService
  ) {}

  // Change active language.
  public changeLanguage(
    event: any,
    lang: string
  ): void {

    event.stopPropagation();
    this.broadcastService.sendBroadcast(EBroadcast.ChangeLanguage, lang);

  }

  // Get name initials.
  private getInitials(): string {

    let abbr: string = null;
    const name: string = this.user.name;
    const arName: string[] = name.split(' ');

    abbr = arName[0].split('')[0];
    abbr += arName.length > 1 ? arName[arName.length - 1].split('')[0] : '';

    return abbr.toUpperCase();

  }

  // Show help modal.
  public showHelp(): void {

    const dialogRef = this.helpDialog.open(HelpComponent);
    dialogRef.afterClosed().subscribe((result: any) => {});

  }

}

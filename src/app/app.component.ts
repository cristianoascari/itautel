// Angular components.
import { Component } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App environment.
import { environment } from '@env/environment';

// App enumerators.
import { EBroadcast } from '@app/core';

// App interfaces.
import { IRequest } from '@app/core';

// App services.
import { AuthService, BroadcastService } from '@app/core/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Selected request (update request).
  public request: IRequest = null;

  // Status.
  public isLoading: boolean = true;

  // Constructor method.
  constructor(
    protected authService: AuthService,
    private broadcastService: BroadcastService,
    protected translate: TranslateService
  ) {

    // Set current language.
    this.setDeafultLanguage();

    // Authenticate user.
    // this.authUser();

    // Listen to broadcast messages.
    this.listenToBroadcast();

  }

  // Edit a request.
  public editRequest(req: IRequest): void { this.request = req; }

  // Cancel edit.
  public cancelEdit(event?: any): void { this.request = null; }

  // Authenticate user.
  private authUser(): void {

    this.authService.login('alfred@wayne.com', '10203040').finally(() => this.isLoading = false);

  }

  // Listen to broadcast events.
  private listenToBroadcast(): void {

    this.broadcastService.events.subscribe(ev => {

      switch (ev.key) {

        // Change language.
        case EBroadcast.ChangeLanguage: this.setLanguage(ev.value, false); break;

      }

    });

  }

  // Set active language.
  private setDeafultLanguage(): void {

    const savedLang: string = localStorage.getItem(environment.localStorage.language);
    const browserLang: string = this.translate.getBrowserLang().toLowerCase();
    const lang: string = savedLang || browserLang;
    this.setLanguage(['en', 'en-US'].indexOf(lang) > -1 ? 'en-US' : 'pt-BR');

  }

  // Set active language.
  private setLanguage(
    lang: string,
    firstRun: boolean = true
  ): void {

    this.translate.use(lang).subscribe(res => { if (firstRun) { setTimeout(() => { this.authUser(); }, 1500); }});
    localStorage.setItem(environment.localStorage.language, lang);

  }

}

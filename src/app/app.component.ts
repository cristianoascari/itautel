// Angular components.
import { Component } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App environment.
import { environment } from '@env/environment';

// App enumerators.
import { EBroadcast } from '@app/core';

// App services.
import { AuthService, BroadcastService } from '@app/core/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
    this.authUser();

    // Listen to broadcast messages.
    this.listenToBroadcast();

  }

  // Authenticate user.
  private authUser(): void {

    this.authService.login('alfred@wayne.com', '10203040').finally(() => this.isLoading = false);

  }

  // Listen to broadcast events.
  private listenToBroadcast(): void {

    this.broadcastService.events.subscribe(ev => {

      switch (ev.key) {

        // Change language.
        case EBroadcast.ChangeLanguage: this.setLanguage(ev.value); break;

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
  private setLanguage(lang: string): void {

    this.translate.use(lang);
    localStorage.setItem(environment.localStorage.language, lang);

  }

}

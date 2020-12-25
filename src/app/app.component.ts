// Angular components.
import { Component } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

// App services.
import { AuthService } from '@app/core/';

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
    protected translate: TranslateService
  ) {

    // Set current language.
    this.setLanguage();

    // Authenticate user.
    this.authUser();

  }

  // Authenticate user.
  private authUser(): void {

    this.authService.login('alfred@wayne.com', '10203040').finally(() => this.isLoading = false);

  }

  // Set active language.
  private setLanguage(): void {

    const lan: string = this.translate.getBrowserLang().toLowerCase();
    this.translate.use(['en', 'en-US'].indexOf(lan) > -1 ? 'en-US' : 'pt-BR');

  }

}

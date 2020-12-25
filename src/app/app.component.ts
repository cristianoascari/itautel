// Angular components.
import { Component } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Constructor method.
  constructor(protected translate: TranslateService) {

    // Set current language.
    this.setLanguage();

  }

  // Set active language.
  private setLanguage(): void {

    const lan: string = this.translate.getBrowserLang().toLowerCase();
    this.translate.use(['en', 'en-US'].indexOf(lan) > -1 ? 'en-US' : 'pt-BR');

  }

}

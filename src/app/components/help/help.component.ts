// Angular modules.
import { Component } from '@angular/core';

// Third-party.
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  // Constructor method.
  constructor(protected translate: TranslateService) {}

}

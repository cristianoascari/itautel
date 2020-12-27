// Angular modules.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Third-party.
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// App routing.
import { AppRoutingModule } from '@app/app-routing.module';

// App modules.
import { CoreModule } from '@app/core/core.module';
import { MaterialModule } from '@app/shared/material/material.module';

// App components.
import { AlertComponent } from './shared/alert/alert.component';
import { AppComponent } from '@app/app.component';
import { FormComponent } from '@app/components/form/form.component';
import { HelpComponent } from './components/help/help.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { ListComponent } from '@app/components/list/list.component';
import { ListDialogComponent } from '@app/components/list/list.component';

// NgxMask.
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader { return new TranslateHttpLoader(http); }

@NgModule({
  declarations: [

    // App components.
    AlertComponent,
    AppComponent,
    FormComponent,
    HelpComponent,
    HeaderComponent,
    ListComponent,
    ListDialogComponent

  ],
  imports: [

    // Angular modules.
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Third-party.
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'pt-BR',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    // App routing.
    AppRoutingModule,

    // App modules.
    CoreModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

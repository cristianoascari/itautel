// Angular modules.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Third-party.
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// App routing.
import { AppRoutingModule } from '@app/app-routing.module';

// App modules.
import { MaterialModule } from '@app/shared/material/material.module';

// App components.
import { AppComponent } from '@app/app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader { return new TranslateHttpLoader(http); }

@NgModule({
  declarations: [

    // App components.
    AppComponent

  ],
  imports: [

    // Angular modules.
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    // Third-party.
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
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

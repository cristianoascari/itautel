// Angular modules.
import { NgModule } from '@angular/core';

// Angular Material modules.
import { MatButtonModule } from '@angular/material/button';

const MaterialComponents: any[] = [
  MatButtonModule
];

@NgModule({
  exports: [MaterialComponents],
  imports: [MaterialComponents]
})
export class MaterialModule {}

// Angular modules.
import { NgModule } from '@angular/core';

// Angular Material modules.
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components list.
const MaterialComponents: any[] = [
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule
];

@NgModule({
  exports: [MaterialComponents],
  imports: [MaterialComponents]
})
export class MaterialModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';


const moduls: any = [MatToolbarModule, MatButtonModule, CoolSocialLoginButtonsModule, MatListModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, ScrollingModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, moduls
  ],
  exports: moduls
})
export class MaterialModule { }

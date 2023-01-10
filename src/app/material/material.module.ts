import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { MatListModule } from '@angular/material/list';



const moduls: any = [MatToolbarModule, MatButtonModule, CoolSocialLoginButtonsModule, MatListModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, moduls
  ],
  exports: moduls
})
export class MaterialModule { }

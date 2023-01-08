import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';



const moduls: any = [MatToolbarModule, MatButtonModule, CoolSocialLoginButtonsModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, moduls
  ],
  exports: moduls
})
export class MaterialModule { }

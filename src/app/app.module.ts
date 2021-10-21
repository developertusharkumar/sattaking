import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginComponent } from './modules/shared/login/login.component';
import { environment } from '../environments/environment';
import { AdminComponent } from './modules/shared/admin/admin.component';
import { HomeComponent } from './modules/home/home.component';
import { ErrorComponent } from './modules/error/error.component';
import { FaqComponent } from './modules/faq/faq.component';
import { DisclaimerComponent } from './modules/disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './modules/contact-us/contact-us.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { ResultComponent } from './modules/result/result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './modules/shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ErrorComponent,
    FaqComponent,
    DisclaimerComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    AboutUsComponent,
    ResultComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

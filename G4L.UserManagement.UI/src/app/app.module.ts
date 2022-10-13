import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { LoaderInterceptor } from './shared/loader/interceptor/loader.interceptor';
import { UsermanagementModule } from './usermanagement/usermanagement.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterLayoutModule } from './master-layout/master-layout.module';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { AttendenceRegisterModule } from './attendence-register/attendence-register.module';
import { RemoveUnderscorePipe } from './shared/pipes/remove-underscore.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsermanagementModule,
    MasterLayoutModule,
    BrowserAnimationsModule, // required animations module
    AttendenceRegisterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

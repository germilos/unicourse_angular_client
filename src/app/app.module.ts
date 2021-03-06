import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CourseEditComponent} from './course-edit/course-edit.component';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from './header/header.component';
import {SearchComponent} from './shared/search/search.component';
import {ListPageComponent} from './list-page/list-page.component';
import {LecturerTableComponent} from './list-page/lecturer-table/lecturer-table.component';
import {CourseTableComponent} from './list-page/course-table/course-table.component';
import {CourseUnitsComponent} from './course-edit/course-units/course-units.component';
import {LecturerSelectComponent} from './course-edit/lecturer-select/lecturer-select.component';
import {LecturerEditComponent} from './lecturer-edit/lecturer-edit.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {httpInterceptorProviders} from './shared/security/auth-interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchByNamePipe } from './shared/pipe/search-by-name.pipe';
import {AuthGuardService} from './shared/security/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CourseEditComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    ListPageComponent,
    LecturerTableComponent,
    CourseTableComponent,
    CourseUnitsComponent,
    LecturerSelectComponent,
    LecturerEditComponent,
    LoginComponent,
    RegisterComponent,
    SearchByNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    NgbModule
  ],
  providers: [httpInterceptorProviders, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

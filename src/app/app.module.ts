import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfessorEditComponent } from './professor-edit/professor-edit.component';
import { AssistantEditComponent } from './assistant-edit/assistant-edit.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './shared/search/search.component';
import { ListPageComponent } from './list-page/list-page.component';
import { LecturerTableComponent } from './list-page/lecturer-table/lecturer-table.component';
import { CourseTableComponent } from './list-page/course-table/course-table.component';
import { CourseUnitsComponent } from './course-edit/course-units/course-units.component';


@NgModule({
  declarations: [
    AppComponent,
    CourseEditComponent,
    HomeComponent,
    ProfessorEditComponent,
    AssistantEditComponent,
    HeaderComponent,
    SearchComponent,
    ListPageComponent,
    LecturerTableComponent,
    CourseTableComponent,
    CourseUnitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

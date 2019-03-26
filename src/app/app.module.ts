import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchByNamePipe } from './search-by-name.pipe';
import { CourseDepatmentFilterPipe } from './course-depatment-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseEditComponent,
    HomeComponent,
    SearchByNamePipe,
    CourseDepatmentFilterPipe
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

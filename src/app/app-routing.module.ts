import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { CourseEditComponent } from './course-edit/course-edit.component';
import { ListPageComponent } from './list-page/list-page.component';
import { LecturerEditComponent } from './lecturer-edit/lecturer-edit.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: ListPageComponent
      },
      {
        path: 'course-add',
        component: CourseEditComponent
      },
      {
        path: 'course-edit/:id',
        component: CourseEditComponent
      }
    ]
  },
  {
    path: 'lecturers',
    children: [
      {
        path: '',
        component: ListPageComponent
      },
      {
        path: 'professor-add',
        component: LecturerEditComponent
      },
      {
        path: 'professor-edit/:id',
        component: LecturerEditComponent
      },
      {
        path: 'assistant-add',
        component: LecturerEditComponent
      },
      {
        path: 'assistant-edit/:id',
        component: LecturerEditComponent
      }
    ]
  },
  {
    path: 'new-user',
    component: RegisterComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

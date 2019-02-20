import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { CourseListComponent } from './course-list/course-list.component'
import { CourseEditComponent } from './course-edit/course-edit.component'

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
        component: CourseListComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

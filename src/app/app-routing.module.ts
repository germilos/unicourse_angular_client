import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { CourseEditComponent } from './course-edit/course-edit.component'
import { ProfessorEditComponent } from './professor-edit/professor-edit.component';
import { AssistantEditComponent } from './assistant-edit/assistant-edit.component';
import { ListPageComponent } from './list-page/list-page.component';

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
        component: ProfessorEditComponent
      },
      {
        path: 'professor-edit/:id',
        component: ProfessorEditComponent
      },
      {
        path: 'assistant-add',
        component: AssistantEditComponent
      },
      {
        path: 'assistant-edit/:id',
        component: AssistantEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

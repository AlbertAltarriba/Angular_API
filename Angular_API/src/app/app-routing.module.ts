import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormComponent } from './components/form/form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "home" },
  { path: "home", component: UserListComponent },
  { path: "home/:currentPage", component: UserListComponent },
  { path: "user/:iduser/:currentPage", component: UserViewComponent },
  { path: "newuser", component: FormComponent },
  { path: "updateuser/:iduser", component: FormComponent },
  { path: "**", component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

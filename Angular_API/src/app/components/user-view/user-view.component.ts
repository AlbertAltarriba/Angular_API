import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  myUser: User | any;
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params:any) => {
      let id: number = Number(params.iduser);
      let response = await this.usersService.getById(id);
      this.myUser = response;
      
    })
  }

  async deleteUser(): Promise<void>{
      let response = await this.usersService.delete(this.myUser.id);
      if(response.id){
        alert(`Usuario ${response.first_name} ${response.last_name} eliminado correctamente!`)
        this.router.navigate(['/home']);
      }
  }

}

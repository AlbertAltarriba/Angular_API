import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  arrUsers: User[] = [];
  currentPage: number = 0;
  total_pages: number = 0;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params:any) => {
      if(params.currentPage){
        this.gotoPage(params.currentPage)
      }
      else{
        this.gotoPage(1);
      }    
    })
    
  }

  async gotoPage(pPage: number): Promise<void> {
    
    let response = await this.usersService.getAll(pPage);
    if(response.page <= response.total_pages){
      this.currentPage = response.page;
      this.arrUsers = response.data;
      this.total_pages = response.total_pages;
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error cargando los usuarios'
      })
      this.router.navigate(['/home']);
    }
  }

}

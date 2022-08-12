import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
      if(response.id){
        this.myUser = response;
      }
      else{
        Swal.fire({ //Error API getById
          icon: 'error',
          title: 'Oops...',
          text: response.error
        })
      }
            
    })
  }

  deleteUser(): void{
    Swal.fire({
      title: 'Seguro que quieres borrar este usuario?',
      text: "No hay marcha atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await this.usersService.delete(this.myUser.id);
        if(response.id){
          Swal.fire(
            'Borrado!',
            `Usuario ${response.first_name} ${response.last_name} eliminado correctamente!`,
            'success'
          )
          this.router.navigate(['/home']);
        }
        else{
          Swal.fire({ //Error API delete
            icon: 'error',
            title: 'Oops...',
            text: response.error
          })
        }
      }
    })  
  }

}

import { Component,Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() myUser!: User;
  @Input() currentPage: number = 0;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  deleteUser(pId: number | undefined): void{
    Swal.fire({
      title: '¿Seguro que quieres eliminar este usuario?',
      text: "¡No hay marcha atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if(pId !== undefined){
          let response = await this.usersService.delete(pId);
          if(response.id){
            Swal.fire(
              '¡Eliminado!',
              `¡Usuario ${response.first_name} ${response.last_name} eliminado correctamente!`,
              'success'
            )
          }
          else{ //error API delete
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.error
            })
          }
        }
        else{ //error usuario undefined 
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encuentra este usuario'
          })
        }
      }
    })  
  }
}

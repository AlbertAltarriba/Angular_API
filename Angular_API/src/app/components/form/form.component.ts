import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  userForm: FormGroup;

  type: string = "Crear nuevo ";

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', []),
      username: new FormControl('', []),
      email: new FormControl('', []),
      password: new FormControl('', []),
    }, [])
  }

  async getDataForm(): Promise<void> {
    if(this.userForm.valid){
      let newUser = this.userForm.value;
      if (newUser.id) {
        //actualizando
        let response = await this.usersService.update(newUser);

        if (response.id) {
          
          Swal.fire({
            icon: 'success',
            title: `Usuario ${response.first_name} ${response.last_name} actualizado`,
            imageUrl: response.image,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showConfirmButton: false,
            timer: 2500
          })
          this.router.navigate(['/home']);
        }
        else {
          Swal.fire({ //Error de API update
            icon: 'error',
            title: 'Oops...',
            text: response.error
          })
        }
      } 
      else {
        //creando
        
        console.log(this.userForm.value)

        let response = await this.usersService.create(newUser)
        if (response.id) {

          console.log(response)

          Swal.fire({
            icon: 'success',
            title: `Usuario ${response.first_name} ${response.last_name} creado correctamente!`,
            imageUrl: response.image,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showConfirmButton: true
          })
          this.router.navigate(['/home'])
        } 
        else {
          Swal.fire({ //Error de API create
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error creando el usuario'
          })
        }
      }
    }
    else{
      Swal.fire({ //Error de form.valid
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error validando el formulario'
    })}
    

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = Number(params.iduser);
      if (id) {
        this.type = 'Actualizar'
        const response = await this.usersService.getById(id)
        if(response.id){
          const user: User = response
          this.userForm = new FormGroup({
            email: new FormControl(user?.email, []),
            first_name: new FormControl(user?.first_name, []),
            last_name: new FormControl(user?.last_name, []),
            image: new FormControl(user?.image, []),
            id: new FormControl(user?.id, [])
          }, [])
        }
        else{
          Swal.fire({ //Error de API getById
            icon: 'error',
            title: 'Oops...',
            text: response.error
          })
        }
      }
    })
  }

}

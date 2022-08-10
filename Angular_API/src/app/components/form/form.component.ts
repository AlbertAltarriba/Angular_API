import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

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
      image: new FormControl('', []),
    }, [])
  }

  async getDataForm(): Promise<void> {
    if(this.userForm.valid){
      let newUser = this.userForm.value;
      if (newUser.id) {
        //actualizando
        let response = await this.usersService.update(newUser);

        if (response.id) {
          alert(`Usuario ${response.first_name} ${response.last_name} actualizado`)
          this.router.navigate(['/home']);
        }
        else alert(response.error)
      } 
      else {
        //creando
        let response = await this.usersService.create(newUser)
        if (response.id) {
          alert(`Usuario ${response.first_name} ${response.last_name} creado correctamente!`)
          this.router.navigate(['/home'])
        } 
        else {
          alert('Hubo un error intentelo de nuevo')
        }
      }
    }
    else{console.log("No valid")}
    

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: number = Number(params.iduser);
      if (id) {
        //hacer una peticion para traerme los datos con lo que quiero llenar el formulario.
        this.type = 'Actualizar'
        const response = await this.usersService.getById(id)
        const user: User = response
        this.userForm = new FormGroup({
          email: new FormControl(user?.email, []),
          first_name: new FormControl(user?.first_name, []),
          last_name: new FormControl(user?.last_name, []),
          image: new FormControl(user?.image, []),
          id: new FormControl(user?.id, [])
        }, [])
      }
    })
  }

}

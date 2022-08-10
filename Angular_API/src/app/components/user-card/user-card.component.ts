import { Component,Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() myUser!: User;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  async deleteUser(pId: number | undefined): Promise<void>{
    if(pId !== undefined){
      let response = await this.usersService.delete(pId);
      if(response.id){
        alert(`Usuario ${response.first_name} ${response.last_name} eliminado correctamente!`)
      }
    }
  }
}

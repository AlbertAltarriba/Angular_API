import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  arrUsers: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.gotoPage();
  }

  async gotoPage(pPage: number = 1): Promise<void> {
    try {
      let response = await this.usersService.getAll();
      // this.currentPage = response.page;
      this.arrUsers = response.data;
      console.log(this.arrUsers)
      // this.total_pages = response.total_pages;
    } catch (err) {
      console.log(err)
    }
  }

}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: User = new User('', '', '', -1);
  public formData: any = {};
  @ViewChild('form') form: NgForm = new NgForm([], []);

  public isCreate = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(+id).subscribe((user) => {
        this.user = user;
        this.form.setValue({
          name: user.name,
          email: user.email,
          password: user.password,
        });
      });
    } else {
      this.isCreate = true;
    }
  }

  onSubmit() {
    this.user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );
    if (!this.isCreate) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) this.user.id = +id;
    }

    if (this.isCreate) {
      // Create new user
      this.userService.addUser(this.user).subscribe(
        () => {
          this.goToUsers();
        },
        (error) => {
        }
      );
    } else {
      // Update existing user
      this.userService.updateUser(this.user).subscribe(
        () => {
          this.goToUsers(); 
        },
        (error) => {
        }
      );
    }
  }
  
  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(() => {
      this.goToUsers();
    });
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationUserMessage = {
    email: [
      {type: 'required', message:'Unesite Vašu email adresu'},
      {type: 'pattern', message: 'Email adresa nije ispravna. Pokušajte ponovo'}
    ],
    password: [
      {type: 'required', message:'Unesite Vašu lozinku'},
      {type: 'minlength', message: 'Lozinka mora da ima minimum 7 karaktera'}
    ]
  };

  validationFormUser: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(7)
      ])),
    });
  }

  loginUser(value){
    console.log('Ulogovan');
  }

}

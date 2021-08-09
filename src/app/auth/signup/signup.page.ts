import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validationUserMessage = {
    fullname: [
      {type: 'required', message:'Unesite Vaše ime i prezime'},
    ],
    phoneNumber: [
      {type: 'required', message:'Unesite broj Vašeg mobilnog telefona'},
      {type: 'minlength', message: 'Broj mobilnog telefona mora da ima minimum 9 cifara'}
    ],
    address: [
      {type: 'required', message:'Unesite Vašu kućnu adresu'},
    ],
    email: [
      {type: 'required', message:'Unesite Vašu email adresu'},
      {type: 'pattern', message: 'Email adresa nije ispravna. Pokušajte ponovo'}
    ],
    password: [
      {type: 'required', message:'Unesite Vašu lozinku'},
      {type: 'minlength', message: 'Lozinka mora da ima minimum 7 karaktera'}
    ]
  };

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              private authService: AuthService,
              private loadingCtl: LoadingController,
              private router: Router) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
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

  onRegister() {
    this.loadingCtl
    .create({message: 'Registracija...'})
    .then((loadingEl) => {
        loadingEl.present();
        this.authService.register(this.registerForm.value).subscribe(resData => {
          console.log('Uspešna registracija');
          console.log(resData);
        });
        this.authService.addUser(this.registerForm.value).subscribe(res => {
          console.log(res);
        });
        loadingEl.dismiss();
        this.router.navigateByUrl('/products');
    });

  }

}

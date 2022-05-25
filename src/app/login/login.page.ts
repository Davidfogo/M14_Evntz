import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import { setStorage } from '../storage';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre;
  password;

  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    public apiService: ApiserviceService

  ) { }

  login(){
    let data = {
      username: this.nombre,
      password: this.password
    }

    

    this.dismiss()

    // this.router.navigate(['/home'])

    try{
      this.apiService.apiLogin(data).subscribe((response) => {
        console.log("hola");
        console.log(response);

        setStorage("apiKey", response)
        // setStorage("uid", "4")

        this.dismiss()

        this.router.navigate(['/home'])
      });
    }catch(err){
      console.log(err)
    }
    
    
   
  }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}

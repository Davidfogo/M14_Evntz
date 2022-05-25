import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre;
  password;
  ciudad;
  pais;

  constructor(
    public modalCtrl: ModalController,
    public apiService: ApiserviceService,
  ) { }

  register(){
    let data = {
      username: this.nombre,
      password: this.password,
      city: this.ciudad,
      country: this.pais
    }

  
    this.apiService.apiRegistre(JSON.stringify(data)).subscribe((response) => {
      console.log(response);
    });
  }

  ngOnInit() {
  }

  
  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

}

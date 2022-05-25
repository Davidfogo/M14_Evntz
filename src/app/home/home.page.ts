import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import { getStorage } from '../storage';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


import * as Leaflet from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})


export class HomePage  {
  
  
  events:any;
  
  apiKey: any;
  uid: any;
  searched: any;

  eventsMap:any;
  map : Leaflet.Map

  // --- opciones del Slider ---
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: false,
    spaceBetween: 25,
    // autoplay:true,
  }

  

  constructor(
    private alertCrtl: AlertController,
    public apiService: ApiserviceService,
    public modalCtrl: ModalController,
    private router: Router,
    
  ) {
   

    this.getDataStorage();
    this.getAllEvents();
  }

  ngOnInit() { }
  ionViewDidEnter() { this.leafletMap(); }

  // ngOnInit() {
  //   this.map = L.map('map', {
  //     center: [ 25.3791924,55.4765436 ],
  //     zoom: 15,
  //     renderer: L.canvas()
  //   })
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '© OpenStreetMap',
  //   }).addTo(this.map)

  //   setTimeout(() => {
  //     this.map.invalidateSize();
  //   }, 0);
  // }


  leafletMap() {
    this.map = Leaflet.map('map').setView([41.416282, 2.198960], 11);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
    }).addTo(this.map);

    var UrgentMarker = new Leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [ 13, 0 ],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });


    for (let i = 0; i < this.eventsMap.length; i++) {
      console.log(this.eventsMap[i].longitud);
      Leaflet.marker([this.eventsMap[i].latitud, this.eventsMap[i].longitud], {icon:UrgentMarker}).addTo(this.map).on('mouseover', this.onClick);;
      // .bindPopup('prueba PopUp');
    }
    // Leaflet.marker([28.6, 77], {icon:UrgentMarker}).addTo(this.map);
    
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

   onClick() {
    this.router.navigate(['/welcome'])

  }

  getAllEvents(){  
    this.apiService.apiGetEvents().subscribe((response) => {
      console.log(response);
      this.events = response;
       this.eventsMap = this.events;

      for (let i = 0; i < this.events.length; i++) {
        console.log(this.events[i].longitud);
        
      }
      
      this.events = this.events.slice(0,3);

    });
  }
  async showAlert(){
    await this.alertCrtl.create({
      header:"Nuevo Evntz",
      subHeader:"¡Crea, conoce y disfruta!",
      message:"¡completa los campos siguientes para crear un evento!",
      inputs:[
        {type: "text", name: "name", placeholder: " Nombre    ej: Running"},
        {type: "text", name: "description", placeholder: "Descripción"},
        {type: "date", name: "date", placeholder: "fecha del evento"},
        {type: "text", name: "latitud", placeholder: "latitud"},
        {type: "text", name: "longitud", placeholder: "longitud"}
        
      ],
      buttons:[{
        text:"Crear", handler:(res) =>{
          
          const HttpOptions ={
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-API-KEY': this.apiKey.uuid
            })
          }
         
          

          let data = {
            name: res.name,
            description: res.description,
            fecha: res.fecha,
            latitud: res.latitud,
            longitud: res.longitud,
            date: res.date,
            
          }
          
          this.apiService.apiAgregarEvento(JSON.stringify(data),HttpOptions).subscribe((response) => {
            console.log(response);
            this.getAllEvents();
            });
            
    
          
        }
      },
      {
        text: "Cancelar"
      }
      ]
    }).then(res => res.present());
  }

  async getDataStorage(){
    this.apiKey = await getStorage("apiKey");
    
  }

  verMas(){
    this.router.navigate(['/ver-mas'])
  }

  search(event){
    //recollir el text del buscador
    const text = event.target.value;
    

    if(text && text.trim() != ""){
      this.searched = this.searched.filter((evento: any) =>{
        return (evento.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }else{
        this.getAllEvents();
      }
  }

  
}





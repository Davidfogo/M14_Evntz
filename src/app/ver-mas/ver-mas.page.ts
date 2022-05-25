import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
// import { NgPageRoutingModule} from './ng2-search-filter';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.page.html',
  styleUrls: ['./ver-mas.page.scss'],
})
export class VerMasPage implements OnInit {
  events:any;
  searched: any;

  constructor(
    public apiService: ApiserviceService,
    private router: Router,
  ) { 
    this.getAllEvents();
    
  }

  ngOnInit() {
  }

  

      



  getAllEvents(){  
    this.apiService.apiGetEvents().subscribe((response) => {
      console.log(response);
      this.events = response;
      this.searched = this.events;
    });
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
    //fer una consulta a la api amb SELECT * FROM _ WHERE _ LIKE "% %";

    verMenos(){
      this.router.navigate(['/home'])
    }
}


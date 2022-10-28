import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }


  @Input() cliente: object = [];

  public onToggleSidenav = () => { 
  
  }

  constructor(private cookie: CookieService) {

  }

  ngOnInit() {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: '',
        router: ['/', 'inicio']
      },
      {
        name: 'Transferir',
        icon: '',
        router: ['/', 'transferir']
      },
      {
        name: 'Cartola',
        icon: '',
        router: ['/', 'cartola']
      }
    ]
  
  }

  cerrarSesion(): void{
    this.cookie.deleteAll();
    window.location.reload();
  }

}

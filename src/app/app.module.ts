import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Mis componentes
import { AppComponent } from './app.component';
import { PopularComponent } from './popular/popular.component';
import { DetailComponent } from './detail/detail.component'

import { HttpClientModule } from '@angular/common/http';

//Mis servicios
import { ApiService } from './Services/api.service'
import { DataService } from './Services/data.service'

//Modulos de Angular
import {Routes, RouterModule} from '@angular/router'

const misRutas: Routes =[
  {'path':'','component': PopularComponent},
  {'path':'home','component': PopularComponent},
  {'path':'post/:id','component': DetailComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    DetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(misRutas)
  ],
  providers: [ApiService,
              DataService],
              
  bootstrap: [AppComponent]
})
export class AppModule { }

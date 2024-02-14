import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule, 
    ComponentsModule,
    provideFirebaseApp(() => initializeApp(
      { 
        "projectId": "appnotas-8b15e", 
        "appId": "1:825732003101:web:0c30f691f8c34081f39df4", 
        "storageBucket": "appnotas-8b15e.appspot.com", 
        "apiKey": "AIzaSyA8ck8UT1KG4SUU1aPy3UvNaVjLO2wwzrQ", 
        "authDomain": "appnotas-8b15e.firebaseapp.com", 
        "messagingSenderId": "825732003101", 
        "measurementId": "G-37E57TLYJ7" 
      })), 
      provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }

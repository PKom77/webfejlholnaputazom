import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MainComponent } from './pages/main/main.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HeaderComponent } from './pages/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { BuyComponent } from './pages/buy/buy.component';
// import { MyTicketsComponent } from './pages/my-tickets/my-tickets.component';
// import { OpenTicketComponent } from './pages/open-ticket/open-ticket.component';
// import { ValidDatePipe } from './shared/pipes/valid-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // MainComponent,
    ContactComponent,
    MenuComponent,
    HeaderComponent,
    // LoginComponent,
    // RegisterComponent,
    // BuyComponent,
    // MyTicketsComponent,
    // OpenTicketComponent,
    // ValidDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    provideAnimations(),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

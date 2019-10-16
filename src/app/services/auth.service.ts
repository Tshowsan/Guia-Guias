import { MenuController } from '@ionic/angular';
import { AlertService } from './alert.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Guia } from '../models/guia';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);
  guiaLogado: Guia = new Guia();

  constructor(
    private menu: MenuController,
    private storage: Storage,
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) { }

  login(user) {
    return this.http.post(
      this.apiService.API_URL + 'guia/efetuarLogin',    // URL
      user,                                             // Objeto
      httpOptions                                       // Headers
    ).pipe(
      tap(guia => {

        if ((guia != null) && (guia['id'] > 0)) {

          // Preenche o objeto usuarioLogado com os dados do usuário que efetuou Login
          this.guiaLogado.id = guia['id'];
          this.guiaLogado.nome = guia['nome'];
          this.guiaLogado.email = guia['email'];
          this.authenticationState.next(true);

          return this.storage.set('guiaLogado', this.guiaLogado).then(res => {
            console.log('Id guia logado: ' + this.guiaLogado.id);
            console.log('guiaLogado armazenado.');
          },
            error => console.error('Erro ao armazenar guiaLogado.', error)
          );

        } else {
          this.logout();
          return null;
        }
      })
    );

  }

  logout() {
    this.storage.remove("guiaLogado").then(() => {
      this.authenticationState.next(false);
      this.menu.enable(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  getGuiaLogado(): Guia {
    if (this.isAuthenticated()) {
      // let user: Usuario;
      this.storage.get('guiaLogado').then(res => {
        if (res) {

          this.guiaLogado = res;
          //this.authenticationState.next(true);

          console.log('Guia Logado: ', this.guiaLogado);
        }
      });

      return this.guiaLogado;
      
    } else {
      return null;
    }

  }

}

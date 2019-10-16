import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { GuiaCadastrarPage } from '../guia-cadastrar/guia-cadastrar.page';
import { Guia } from 'src/app/models/guia';

import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-guia-login',
  templateUrl: './guia-login.page.html',
  styleUrls: ['./guia-login.page.scss'],
})
export class GuiaLoginPage implements OnInit {

  guia: Guia;
 
  
  loginForm: FormGroup;
  error_messages = {
    'email': [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'minLength', message: 'E-mail deve ter no mínimo 6 caracteres.' },
      { type: 'maxLength', message: 'E-mail deve ter no máximo 80 caracteres.' },
      { type: 'pattern', message: 'Informe um e-mail válido.' },
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minLength', message: 'A senha deve ter no mínimo 3 caracteres.' },
      { type: 'maxLength', message: 'A senha deve ter no máximo 8 caracteres.' },
    ]
  }

//passando no construtor o router pra poder traçar a rota 
  constructor(
    public loadingController: LoadingController,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public authService: AuthService,
    private alertService: AlertService,
    public router: Router) 
    {
      this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(80), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]]
      });

     }

  ngOnInit() {
   
  }
  resetaDadosForm() {
    this.loginForm.patchValue({
      email: null,
      password: null
    });
  }

  // Dismiss Login Modal
  dismissLogin() {    
    // this.resetaDadosForm();
    this.modalController.dismiss();
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    // this.resetaDadosForm();
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: GuiaCadastrarPage
    });
    return await registerModal.present();
  }

  // Adicionar função assíncrona para o envio do formulário de manuseio.
  async onFormSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Efetuando login...'
    });
    await loading.present();
    await this.authService.login(form)
      .subscribe(data => {
        loading.dismiss(); // apagar a mensagem de Efetuando login...
        if ((data != null) && (data['id'] > 0)) {
          this.alertService.presentToast("Logado com sucesso!");
          this.dismissLogin();
          this.router.navigate([ 'home' ]);
        } else {
          this.alertService.presentToast("Login/senha incorretos.");
        }

      }, (erro) => {
        console.log(erro);
        loading.dismiss();
      });
  }


  //metodo que faz a nevagação entre as telas de login para cadastro
  rotaTelaCadastro(){
    this.router.navigate(['/guia-cadastrar'])
  }
  //metodo que faz a nevagação entre as telas de login para home
  rotaTelaHome(){
    this.router.navigate(['/home'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { GuiaCadastrarPage } from '../guia-cadastrar/guia-cadastrar.page';

@Component({
  selector: 'app-guia-login',
  templateUrl: './guia-login.page.html',
  styleUrls: ['./guia-login.page.scss'],
})
export class GuiaLoginPage implements OnInit {


  
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
  constructor(public loadingController: LoadingController,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

 

  //metodo que faz a nevagação entre as telas de login para cadastro
  rotaTelaCadastro(){
    this.router.navigate(['/guia-cadastrar'])
  }
  //metodo que faz a nevagação entre as telas de login para home
  rotaTelaHome(){
    this.router.navigate(['/home'])
  }
}

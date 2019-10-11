import { GuiaService } from './../../../services/guia.service';
import { Guia } from './../../../models/guia';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-guia-cadastrar',
  templateUrl: './guia-cadastrar.page.html',
  styleUrls: ['./guia-cadastrar.page.scss'],
})
export class GuiaCadastrarPage implements OnInit {

  //Simples
  guia: Guia;

  @Input() guiaCadastrarForm: FormGroup;

  error_messages = {
    'nome': [
      { type: 'required', message: 'Campo Obrigatorio.' }
    ],
    'sobrenome': [
      { type: 'required', message: 'Campo Obrigatorio.' }
    ],
    'email': [
      { type: 'required', message: 'Campo Obrigatorio.' }
    ],
    'telefone': [
      { type: 'required', message: 'Campo Obrigatorio.' }
    ],
    'senha': [
      { type: 'required', message: 'Campo Obrigatorio.' },
      { type: 'minLength', message: 'A senha deve conter no mínimo 5 caracteres.' },
      { type: 'maxLength', message: 'A senha deve conter no maximo 12 caracteres.' }
    ],
    'cadastur': [
      { type: 'required', message: 'Campo Obrigatorio.' }
    ],
    'estado': [
      { type: 'required', message: 'Campo Obrigatorio.' }
    ],
    'cidade': [
      { type: 'required', message: 'Campo Obrigatorio.' }
    ],
    'linguas': [
      { type: 'required', message: 'Campo Obrigatorio.' }
    ],
  }


  cadastrarGuia(){
   this.guiaCadastrarForm = this.formBuilder.group({
   nome:[ null, Validators.required],
   sobrenome:[null, Validators.required],
   email:[null, Validators.required],
   telefone:[null, Validators.required],
   senha:[null, [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
   cadastur:[null, Validators.required],
   estado:[null, Validators.required],
   cidade:[null, Validators.required],
   linguas:[null, Validators.required],
   plantao:["false"],
   ativo:["false"],
   });

  }
  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public guiaService: GuiaService
  ) { }

  ngOnInit() {
    this.cadastrarGuia();
  }

  async onFormSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    await this.guiaService.postGuia(form)
      .subscribe(res => {
        loading.dismiss();
        console.log(res);
      }, (err) => {
        console.log(err);
        alert('erro')
        loading.dismiss();
      });
  }

}

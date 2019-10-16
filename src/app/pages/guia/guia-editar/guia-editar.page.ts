import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GuiaService } from 'src/app/services/guia.service';
import { Guia } from 'src/app/models/guia';

@Component({
  selector: 'app-guia-editar',
  templateUrl: './guia-editar.page.html',
  styleUrls: ['./guia-editar.page.scss'],
})
export class GuiaEditarPage implements OnInit {
 //Simples
 guia: Guia;

 @Input() guiaEditarForm: FormGroup;

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


 editarGuia(){
  this.guiaEditarForm = this.formBuilder.group({
  id:[null],
  nome:[null, Validators.required],
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
   public router: Router,
   private formBuilder: FormBuilder,
   public loadingController: LoadingController,
   public guiaService: GuiaService
 ) { }

 ngOnInit() {
   this.getGuiaPorId(3);
   this.editarGuia();
 }
rotaTelaLogin()
{

 this.router.navigate(['/guia-login'])
}
 async onFormSubmit(form: NgForm) {
   const loading = await this.loadingController.create({
     message: 'Carregando...'
   });
   await loading.present();
   await this.guiaService.putGuia(form)
     .subscribe(res => {
       loading.dismiss();
       console.log(res);
     }, (err) => {
       console.log(err);
       alert('erro')
       loading.dismiss();
     });
 }

  async getGuiaPorId(id) {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    await this.guiaService.getGuiaById(id)
      .subscribe(res => {
        loading.dismiss();
        this.guia = res;
        this.addDadosForm();
        console.log(res);     
      }, err => {
        console.log(err);
        loading.dismiss();
        
      });
    }

    addDadosForm() {
      this.guiaEditarForm.patchValue({
        id:this.guia.id,
        nome:this.guia.nome,
        sobrenome:this.guia.sobrenome,
        email:this.guia.email,
        telefone:this.guia.telefone,
        senha:this.guia.senha,
        cadastur:this.guia.cadastur,
        estado:this.guia.estado,
        cidade:this.guia.cidade,
        linguas:this.guia.linguas,
        plantao:this.guia.plantao,
        ativo:this.guia.ativo,
      });
    }

  }


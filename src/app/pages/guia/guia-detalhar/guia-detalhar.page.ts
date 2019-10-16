import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { GuiaService } from 'src/app/services/guia.service';
import { Guia } from 'src/app/models/guia';

@Component({
  selector: 'app-guia-detalhar',
  templateUrl: './guia-detalhar.page.html',
  styleUrls: ['./guia-detalhar.page.scss'],
})
export class GuiaDetalharPage implements OnInit {
 //Simples
 guia: Guia;

 @Input() guiaDetalharForm: FormGroup;

 detalharGuia(){
  this.guiaDetalharForm = this.formBuilder.group({
  id:[null],
  nome:[null],
  sobrenome:[null],
  email:[null],
  telefone:[null],
  senha:[null],
  cadastur:[null],
  estado:[null],
  cidade:[null],
  linguas:[null],
  plantao:[null],
  ativo:[null]
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
   this.detalharGuia();
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
      this.guiaDetalharForm.patchValue({
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
import { GuiaService } from './../../../services/guia.service';
import { Guia } from './../../../models/guia';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
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


  cadastrarGuia(){
   this.guiaCadastrarForm = this.formBuilder.group({
   nome:[null],
   email:[null],
   telefone:[null],
   senha:[null],
   cadastur:[null],
   valor:[null]
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

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaLoginPage } from './guia-login.page';

describe('GuiaLoginPage', () => {
  let component: GuiaLoginPage;
  let fixture: ComponentFixture<GuiaLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

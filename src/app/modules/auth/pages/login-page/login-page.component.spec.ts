import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [LoginPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('✔✔ Deberia de retornar "valido" el formulario', () => {
    const mockCredentials = {
      rut: '27.218.434-8',
      contraseña: 'test123'
    }

    const rutForm: any = component.formLogin.get('rut')
    const contraseñaForm: any = component.formLogin.get('contraseña')

    rutForm.setValue(mockCredentials.rut)
    contraseñaForm.setValue(mockCredentials.contraseña)

    expect(component.formLogin.invalid).toEqual(false);
  });

  it('👍 El boton deberia de tener la palabra "Ingresar"', () => {

    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText

    expect(getInnerText).toEqual('Ingresar')

  })

});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPageComponent } from './inicio-page.component';

describe('InicioPageComponent', () => {
  let component: InicioPageComponent;
  let fixture: ComponentFixture<InicioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InicioPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});

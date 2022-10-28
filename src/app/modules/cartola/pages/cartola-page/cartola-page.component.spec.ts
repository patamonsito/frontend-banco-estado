import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartolaPageComponent } from './cartola-page.component';

describe('CartolaPageComponent', () => {
  let component: CartolaPageComponent;
  let fixture: ComponentFixture<CartolaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartolaPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartolaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});

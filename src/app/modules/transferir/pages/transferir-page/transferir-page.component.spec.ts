import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirPageComponent } from './transferir-page.component';

describe('TransferirPageComponent', () => {
  let component: TransferirPageComponent;
  let fixture: ComponentFixture<TransferirPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TransferirPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferirPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KbComponent } from './kb.component';

describe('KbComponent', () => {
  let component: KbComponent;
  let fixture: ComponentFixture<KbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

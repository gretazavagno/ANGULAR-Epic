import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnniEsperienzaComponent } from './anni-esperienza.component';

describe('AnniEsperienzaComponent', () => {
  let component: AnniEsperienzaComponent;
  let fixture: ComponentFixture<AnniEsperienzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnniEsperienzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnniEsperienzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatearticleComponent } from './createarticle.component';

describe('CreatearticleComponent', () => {
  let component: CreatearticleComponent;
  let fixture: ComponentFixture<CreatearticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatearticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatearticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

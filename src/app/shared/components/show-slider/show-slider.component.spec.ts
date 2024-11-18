import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSliderComponent } from './show-slider.component';

describe('ShowSliderComponent', () => {
  let component: ShowSliderComponent;
  let fixture: ComponentFixture<ShowSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleShowTypeComponent } from './toggle-show-type.component';

describe('ToggleShowTypeComponent', () => {
  let component: ToggleShowTypeComponent;
  let fixture: ComponentFixture<ToggleShowTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleShowTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleShowTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

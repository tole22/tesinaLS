import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InaccessibleElementsComponent } from './inaccessible-elements.component';

describe('InaccessibleElementsComponent', () => {
  let component: InaccessibleElementsComponent;
  let fixture: ComponentFixture<InaccessibleElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InaccessibleElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InaccessibleElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

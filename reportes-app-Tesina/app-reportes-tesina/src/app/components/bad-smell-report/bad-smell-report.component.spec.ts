import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadSmellReportComponent } from './bad-smell-report.component';

describe('BadSmellReportComponent', () => {
  let component: BadSmellReportComponent;
  let fixture: ComponentFixture<BadSmellReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadSmellReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadSmellReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

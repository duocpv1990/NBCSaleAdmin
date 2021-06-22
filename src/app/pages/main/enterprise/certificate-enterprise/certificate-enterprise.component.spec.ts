import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateEnterpriseComponent } from './certificate-enterprise.component';

describe('CertificateEnterpriseComponent', () => {
  let component: CertificateEnterpriseComponent;
  let fixture: ComponentFixture<CertificateEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateEnterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

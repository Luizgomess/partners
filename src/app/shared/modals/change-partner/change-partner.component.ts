import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@elgomezz/finui';
import { Observable, tap } from 'rxjs';
import { Partner } from 'src/app/core/interfaces/partner.interface';
import { PartnersService } from 'src/app/core/services/partners/partners.service';

@Component({
  selector: 'app-change-partner',
  templateUrl: './change-partner.component.html',
  styleUrls: ['./change-partner.component.scss']
})
export class ChangePartnerComponent {
  @Input() action: 'edit' | 'create' = 'create';
  @Input() partner: Partner = { name: '', description: '', repositoryGit: '', urlDoc: '' } as Partner;
  submit$!: Observable<any>;
  partnerForm!: FormGroup;

  constructor(private fb: FormBuilder, private partnersService: PartnersService, private modalService: ModalService) {

  }

  ngOnInit(): void {
    this.createForm();
    if (this.action === 'edit' && this.partner) {
      this.partnerForm.patchValue(this.partner);
    }


  }

  createForm() {
    this.partnerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      repositoryGit: ['', Validators.required],
      urlDoc: ['', Validators.required],
    });
  }

  closeModal(): void {
    this.modalService.closeModal()
  }

  onSubmit(): void {
    if (this.partnerForm.valid) {
      if (this.action === 'edit' && this.partner.id) {
        this.submit$ = this.partnersService.updatePartner(this.partner?.id, this.partnerForm.value).pipe(
          tap(() => this.closeModal())
        );
      } else {
        this.submit$ = this.partnersService.createPartner(this.partnerForm.value).pipe(
          tap(() => this.closeModal())
        );
      }
    }
  }
}

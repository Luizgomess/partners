import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService, ModalService } from '@elgomezz/finui';
import { Observable, map, tap } from 'rxjs';
import { Partner } from 'src/app/core/interfaces/partner.interface';
import { PartnersService } from 'src/app/core/services/partners/partners.service';
import { ChangePartnerComponent } from 'src/app/shared/modals/change-partner/change-partner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'extPartners';
  partners$: Observable<any[]> | undefined;
  currentPage = 1;
  pageSize = 6;
  collectionSize = 0;
  total = 0;
  partnerId = '';

  constructor(private partnersService: PartnersService,
    private modalService: ModalService,
    private confirmService: ConfirmService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      console.log(params['params'].page)
      this.currentPage = params['params'].page ? +params['params'].page : 1;
    });

    this.getPartners();
      this.confirmService.confirmTrigger$.subscribe((id) => {
        this.deletePartner(id)
      });
  }

  getPartners() {
    this.partners$ = this.partnersService.getPartners().pipe(
      map(partners => {
        this.total = Math.ceil(partners.length / this.pageSize);
        return partners;
      })
    );
  }

  deletePartner(id: string): void {
    this.partners$ = this.partnersService.deletePartner(id).pipe(
      tap(partners => {
        this.currentPage = this.currentPage - 1;
        this.total = Math.ceil(partners.length / this.pageSize);
      })
    );
  }

  onInputChange(value: string): void {
    if (!value) {
      this.partnersService.setFilter(null);
    }
  }

  search() {
    this.partnersService.setFilter(this.partnerId);
    this.currentPage = 1;
    this.changePage()
  }

  openExampleModal(id: string): void {
    this.confirmService.open({ data: id });
  }

  openChangeModal(action: string, partner?: Partner): void {
    this.modalService.openModal(ChangePartnerComponent, { action, partner })
  }

  changePage(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge' // Preserva outros parâmetros na URL
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/types';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../shared/services';
import { CustomerFormService } from '../../services';
import { BancoEnum, EstadoEnum, TipoContaEnum } from '../../../shared/enums';
import { ConvertedEnum } from '../../../../../../@core/types';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    standalone: false,
})
export class CustomerComponent implements OnInit {
    // Region public props
    public isLoading!: boolean;

    public customer!: Customer;

    public customerForm!: UntypedFormGroup;

    public estadosConverted!: Array<ConvertedEnum>;

    public bancosConverted!: Array<ConvertedEnum>;

    public tipoContasConverted!: Array<ConvertedEnum>;
    // EndRegion public props

    // Region private props
    private readonly customerService!: CustomerService;

    private readonly customerFormService!: CustomerFormService;

    private readonly router!: Router;

    private readonly activatedRoute!: ActivatedRoute;
    // EndRegion private props

    // Region Constructor
    constructor(
        customerService: CustomerService,
        customerFormService: CustomerFormService,
        router: Router,
        activatedRoute: ActivatedRoute
    ) {
        // Injectables
        this.customerService = customerService;
        this.customerFormService = customerFormService;
        this.router = router;
        this.activatedRoute = activatedRoute;
    }
    // EndRegion constructor

    // Region lifecycle
    ngOnInit(): void {
        this.isLoading = true;

        this.estadosConverted = this.convertEnum(EstadoEnum);
        this.bancosConverted = this.convertEnum(BancoEnum);
        this.tipoContasConverted = this.convertEnum(TipoContaEnum);

        this.activatedRoute.params.subscribe((params) => {
            const id = Number(params['id']);
            if (id) {
                this.customerService.findById(id).subscribe(
                    (customer) => {
                        this.customer = customer;
                        this.isLoading = false;
                        this.customerForm = this.customerFormService.create(customer);
                    },
                    (error) => {
                        console.error('Error fetching customer:', error);
                        this.isLoading = false;
                        this.router.navigate(['/clientes']);
                    }
                );
            } else {
                this.isLoading = false;
                this.customerForm = this.customerFormService.create();
            }
        });
    }
    // EndRegion lifecycle

    // Region public methods
    public save(): void {
        if (this.customerForm.invalid) {
            this.customerForm.markAllAsTouched();
            return;
        }

        let customer: Customer = this.customerFormService.merge(this.customerForm, this.customer);

        this.customerService.save(customer).subscribe(
            (savedCustomer) => {
                this.router.navigate(['/clientes']);
            },
            (error) => {
                console.error('Error saving customer:', error);
            }
        );
    }

    public cancelar(): void {
        this.router.navigate(['/clientes']);
    }
    // EndRegion public methods

    // Region private methods
    private convertEnum<T extends Record<string, string | number>>(enumObj: T): Array<ConvertedEnum> {
        return Object.entries(enumObj).map(([key, value]) => ({
            name: key,
            value: value,
        }));
    }
    // EndRegion private methods
}

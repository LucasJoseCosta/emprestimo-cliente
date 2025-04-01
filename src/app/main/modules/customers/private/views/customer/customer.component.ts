import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/types';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../shared/services';
import { CustomerFormService } from '../../services';
import { BancoEnum, EstadoEnum, TipoContaEnum } from '../../../shared/enums';
import { ConvertedEnum } from '../../../../../../@core/types';

import { trigger, transition, style, animate } from '@angular/animations';
import { ToastService } from '../../../../../../@core/services/toast.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    standalone: false,
})
export class CustomerComponent implements OnInit {
    // Region public props
    /**
     * Flag de loading
     */
    public isLoading!: boolean;

    /**
     * Entidade do tipo Customer
     * {@link Customer}
     */
    public customer!: Customer;

    /**
     * Form de customer
     */
    public customerForm!: UntypedFormGroup;

    /**
     * Array de Enum de estados convertido
     * {@link ConvertedEnum}
     */
    public estadosConverted!: Array<ConvertedEnum>;

    /**
     * Array de Enum de bancos convertido
     * {@link ConvertedEnum}
     */
    public bancosConverted!: Array<ConvertedEnum>;

    /**
     * Array de Enum de tipos de conta convertido
     * {@link ConvertedEnum}
     */
    public tipoContasConverted!: Array<ConvertedEnum>;

    /**
     * Data maxima de input data nascimento
     */
    public inputMaxDate: Date | undefined;

    /**
     * @inheritdoc
     */
    public breadcrumbItems: Array<MenuItem>;
    // EndRegion public props

    // Region private props
    /**
     * Serviço de requisição de customer
     */
    private readonly customerService!: CustomerService;

    /**
     * Serviço de formulario de customer
     */
    private readonly customerFormService!: CustomerFormService;

    /**
     * Serviço de toaster
     */
    private readonly toastService: ToastService;

    /**
     * Serviço de Router
     */
    private readonly router!: Router;

    /**
     * Serviço de ActivatedRoute
     */
    private readonly activatedRoute!: ActivatedRoute;
    // EndRegion private props

    // Region Constructor
    constructor(
        customerService: CustomerService,
        customerFormService: CustomerFormService,
        toastService: ToastService,
        router: Router,
        activatedRoute: ActivatedRoute
    ) {
        //Init props
        this.breadcrumbItems = [
            { label: 'Clientes', routerLink: '/clientes' },
            { label: 'Cliente', disabled: true },
        ];

        // Injectables
        this.customerService = customerService;
        this.customerFormService = customerFormService;
        this.toastService = toastService;
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
        this.inputMaxDate = new Date();

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
                        this.toastService.showError('Error', error.message);
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
    /**
     * Metodo de save para edição e criação de customer
     */
    public save(): void {
        if (this.customerForm.invalid) {
            this.customerForm.markAllAsTouched();
            return;
        }

        let customer: Customer = this.customerFormService.merge(this.customerForm, this.customer);

        this.customerService.save(customer).subscribe(
            (savedCustomer) => {
                this.toastService.showSuccess('Adicionado', 'Cliente adicionado com sucesso');
                this.router.navigate(['/clientes']);
            },
            (error) => {
                this.toastService.showError('Error', error.message);
            }
        );
    }

    /**
     * Metodo para cancelar criação e edição
     */
    public cancelar(): void {
        this.router.navigate(['/clientes']);
    }
    // EndRegion public methods

    // Region private methods
    /**
     * Metodo para conversão de enum
     * @returns array de enum convertido
     */
    private convertEnum<T extends Record<string, string | number>>(enumObj: T): Array<ConvertedEnum> {
        return Object.entries(enumObj).map(([key, value]) => ({
            name: key,
            value: value,
        }));
    }
    // EndRegion private methods
}

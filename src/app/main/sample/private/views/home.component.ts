import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { QuotesTab } from '../../../../@core/types';
import { BCBService } from '../../../modules/loans/shared/services/bcb.service';
import { CurrencyQuoteParams, Loan } from '../../../modules/loans/shared/types';
import { forkJoin, map, Observable, Observer } from 'rxjs';
import { CustomerService } from '../../../modules/customers/shared/services';
import { LoanService } from '../../../modules/loans/shared/services/loans.service';
import { Customer } from '../../../modules/customers/shared/types';
import { StatusEnum } from '../../../modules/customers/shared/enums';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false,
})
export class HomeComponent implements OnInit {
    // Region public props
    public isLoading!: boolean;
    public quotesTabs!: Array<QuotesTab>;
    public loans!: Array<Loan>;
    public customers!: Array<Customer>;
    public dataChartCustomers!: ChartData<'pie', number[], string>;
    public optionsChartCustomers!: ChartOptions<'pie'>;
    // EndRegion public props

    // Region private props
    private readonly bcbService: BCBService;
    private readonly customerService: CustomerService;
    private readonly loanService: LoanService;
    // EndRegion private props

    // Region constructor
    constructor(bcbService: BCBService, customerService: CustomerService, loanService: LoanService) {
        // Init public props
        this.isLoading = true;
        this.quotesTabs = [];
        // Injectables
        this.bcbService = bcbService;
        this.customerService = customerService;
        this.loanService = loanService;
    }
    // EndRegion constructor

    // Region life cycle
    ngOnInit(): void {
        this.isLoading = true;
        this.bcbService.getCoins().subscribe((coins) => {
            // Cria um Observable para cada coin que obtém a cotação
            let requests: Observable<any>[] = coins.map((coin) =>
                this.getCurrencyQuoteObservable(coin.simbolo, new Date(), 0)
            );

            const loanRequest = this.loanService.findAll().pipe(map((loans) => ({ loans })));
            const customerRequest = this.customerService.findAll().pipe(map((customers) => ({ customers })));

            requests.push(loanRequest);
            requests.push(customerRequest);

            forkJoin(requests).subscribe(
                (results) => {
                    const loanResponse = results[results.length - 2] as { loans: Loan[] };
                    const customerResponse = results[results.length - 1] as { customers: Customer[] };

                    // Remover quando não precisar mais
                    this.loans = loanResponse.loans;
                    this.customers = customerResponse.customers;

                    this.initConfigCustomers(customerResponse.customers);
                    this.isLoading = false;
                },
                (error) => {
                    console.error(error);
                    this.isLoading = false;
                }
            );
        });
    }
    // EndRegion life cycle

    /**
     * Retorna um Observable para buscar a cotação da moeda
     */
    private getCurrencyQuoteObservable(currency: string, date: Date, retryCount: number): Observable<void> {
        return new Observable<void>((observer) => {
            this.tryGetCurrencyQuote(currency, date, retryCount, observer);
        });
    }

    /**
     * Faz a requisição de taxa de conversão
     */
    private tryGetCurrencyQuote(currency: string, date: Date, retryCount: number, observer: Observer<void>): void {
        let formattedDate = this.formatDate(date);

        let quotesParams: CurrencyQuoteParams = {
            moeda: currency,
            data: formattedDate,
        };

        this.bcbService.getCurrencysQuotes(quotesParams).subscribe(
            (response) => {
                if (response) {
                    let quoteTab: QuotesTab = {
                        tab: currency,
                        value: response[response.length - 1].cotacaoVenda,
                    };
                    this.quotesTabs.push(quoteTab);
                    observer.next();
                    observer.complete();
                } else {
                    let previousDate = new Date(date);
                    previousDate.setDate(date.getDate() - 1);
                    if (retryCount < 2) {
                        this.tryGetCurrencyQuote(currency, previousDate, retryCount + 1, observer);
                    } else {
                        observer.error('Não foi possível obter a cotação.');
                    }
                }
            },
            (error) => {
                console.error(error);
                observer.error(error);
            }
        );
    }

    /**
     * Formata data para requisição de taxa de conversão
     * @param date
     * @returns string
     */
    private formatDate(date: Date): string {
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }

    private initConfigCustomers(customers: Array<Customer>) {
        const activeCustomers = this.filterCustomersByStatus(customers, StatusEnum.ATIVO);
        const defaulterCustomers = this.filterCustomersByStatus(customers, StatusEnum.INADIMPLENTE);
        const inactiveCustomers = this.filterCustomersByStatus(customers, StatusEnum.INATIVO);
        const pendingCustomers = this.filterCustomersByStatus(customers, StatusEnum.PENDENTE);

        // Configuração dos dados do gráfico de pizza
        this.dataChartCustomers = {
            labels: [StatusEnum.ATIVO, StatusEnum.INADIMPLENTE, StatusEnum.INATIVO, StatusEnum.PENDENTE],
            datasets: [
                {
                    label: 'Clientes',
                    data: [
                        activeCustomers.length,
                        defaulterCustomers.length,
                        inactiveCustomers.length,
                        pendingCustomers.length,
                    ],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(189, 195, 199, 0.8)',
                        'rgba(241, 196, 15, 0.8)',
                    ],
                    borderColor: [
                        'rgba(39, 174, 96, 1)',
                        'rgba(192, 57, 43, 1)',
                        'rgba(127, 140, 141, 1)',
                        'rgba(243, 156, 18, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        // Configuração das opções do gráfico de pizza
        this.optionsChartCustomers = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                    text: 'Clientes',
                },
            },
        };
    }

    // Função auxiliar para converter o status do customer na chave do enum
    private getStatusKey(customer: { status?: { status: string } }): keyof typeof StatusEnum | undefined {
        if (!customer.status) return undefined;
        // Converte para maiúsculas para casar com as chaves do enum
        return customer.status.status.toUpperCase() as keyof typeof StatusEnum;
    }

    // Função auxiliar para filtrar os clientes por status desejado
    private filterCustomersByStatus<T extends { status?: { status: string } }>(
        customers: T[],
        status: StatusEnum
    ): T[] {
        return customers.filter((customer) => {
            const key = this.getStatusKey(customer);
            return key ? StatusEnum[key] === status : false;
        });
    }
}

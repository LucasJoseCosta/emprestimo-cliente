import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { QuotesTab } from '../../../../@core/types';
import { BCBService } from '../../../modules/loans/shared/services/bcb.service';
import { CurrencyQuoteParams, Loan } from '../../../modules/loans/shared/types';
import { forkJoin, map, max, Observable, Observer } from 'rxjs';
import { CustomerService } from '../../../modules/customers/shared/services';
import { LoanService } from '../../../modules/loans/shared/services/loans.service';
import { Customer } from '../../../modules/customers/shared/types';
import { StatusEnum } from '../../../modules/customers/shared/enums';
import { InstallmentPeriodEnum } from '../../../modules/loans/shared/enums';
import { parseISO, startOfWeek, endOfWeek, format } from 'date-fns';
import { ChartAction } from '../../../../@core/components/chart/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: false,
})
export class HomeComponent implements OnInit {
    // Region public props
    /**
     * @inheritdoc
     */
    public isLoading!: boolean;
    /**
     * @inheritdoc
     */
    public quotesTabs!: Array<QuotesTab>;
    /**
     * @inheritdoc
     */
    public loans!: Array<Loan>;
    /**
     * @inheritdoc
     */
    public customers!: Array<Customer>;
    /**
     * @inheritdoc
     */
    public dataChartCustomers!: ChartData<'pie', number[], string>;
    /**
     * @inheritdoc
     */
    public optionsChartCustomers!: ChartOptions<'pie'>;
    /**
     * @inheritdoc
     */
    public dataChartLoansInstallment!: ChartData<'bar', number[], string>;
    /**
     * @inheritdoc
     */
    public optionsChartLoansInstallment!: ChartOptions<'bar'>;
    /**
     * @inheritdoc
     */
    public titleChartsLoans!: string;
    /**
     * @inheritdoc
     */
    public typeChartLoans!: ChartType;
    /**
     * @inheritdoc
     */
    public dataChartLoans!: ChartData<'bar', number[], string>;
    /**
     * @inheritdoc
     */
    public optionsChartLoans!: ChartOptions<'bar'>;
    /**
     * @inheritdoc
     */
    public loansChartActions!: Array<ChartAction>;
    // EndRegion public props

    // Region private props
    /**
     * Serviço de requisições banco central
     */
    private readonly bcbService: BCBService;
    /**
     * Serviço de requisições customer
     */
    private readonly customerService: CustomerService;
    /**
     * Serviço de requisições loan
     */
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

                    this.loans = loanResponse.loans;

                    this.initConfigCustomers(customerResponse.customers);
                    this.initConfigLoansChart(loanResponse.loans);
                    this.initConfigsLoansInstallmentChart(loanResponse.loans);
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

    // Region private methods
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
    private tryGetCurrencyQuote(currency: string, date: Date, retryCount: number, observer: Observer<void>) {
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
    /**
     * Popula e configura gráfico de customers
     * @param customers
     */
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

    /**
     * Função auxiliar para converter o status do customer na chave do enum
     */
    private getStatusKey(customer: { status?: { status: string } }): keyof typeof StatusEnum | undefined {
        if (!customer.status) return undefined;
        // Converte para maiúsculas para casar com as chaves do enum
        return customer.status.status.toUpperCase() as keyof typeof StatusEnum;
    }

    /**
     * Função auxiliar para filtrar os clientes por status desejado
     * @param customers
     * @param status
     * @returns clientes filtrados pelo status
     */
    private filterCustomersByStatus<T extends { status?: { status: string } }>(
        customers: T[],
        status: StatusEnum
    ): T[] {
        return customers.filter((customer) => {
            const key = this.getStatusKey(customer);
            return key ? StatusEnum[key] === status : false;
        });
    }

    /**
     * Popula e configura gráfico de quantidade de empréstimo por periodo
     */
    private initConfigLoansChart(loans: Array<Loan>) {
        this.titleChartsLoans = 'Empréstimos';
        this.typeChartLoans = 'bar';

        const selectedPeriod: 'week' | 'month' | 'year' = 'month';

        const loansGrouped = this.groupLoansByPeriod(loans, selectedPeriod);
        const periodLabels = Object.keys(loansGrouped).sort();
        const loansCount = periodLabels.map((label) => loansGrouped[label]);
        const maxLoans = Math.max(...loansCount);

        this.dataChartLoans = {
            labels: periodLabels,
            datasets: [
                {
                    label: `Total de Empréstimos por ${this.getPeriodLabel(selectedPeriod)}`,
                    data: loansCount,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        };

        this.optionsChartLoans = {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: false,
                },
            },
            scales: {
                y: { beginAtZero: true, max: maxLoans + 10, ticks: { stepSize: 1, precision: 0 } },
            },
        };

        this.loansChartActions = [
            {
                label: 'Semana',
                callback: () => {
                    this.updateChartByPeriod('week');
                },
                severity: 'secondary',
            },
            {
                label: 'Mês',
                callback: () => {
                    this.updateChartByPeriod('month');
                },
                severity: 'secondary',
            },
            {
                label: 'Ano',
                callback: () => {
                    this.updateChartByPeriod('year');
                },
                severity: 'secondary',
            },
        ];
    }

    /**
     * Função auxiliar para agrupamento de empréstimo por periodo
     */
    private groupLoansByPeriod(loans: Array<Loan>, period: 'week' | 'month' | 'year'): Record<string, number> {
        return loans.reduce((acc, loan) => {
            const date = parseISO(loan.dataEmprestimo ?? '');
            let key: string;
            if (period === 'week') {
                const start = startOfWeek(date, { weekStartsOn: 0 });
                const end = endOfWeek(date, { weekStartsOn: 0 });
                key = `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`;
            } else if (period === 'month') {
                key = format(date, 'MM/yyyy');
            } else {
                key = format(date, 'yyyy');
            }

            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }

    /**
     * Função auxiliar para obter o rótulo correto
     */
    private getPeriodLabel(period: 'week' | 'month' | 'year'): string {
        return period === 'week' ? 'Semana' : period === 'month' ? 'Mês' : 'Ano';
    }

    /**
     * Atualiza gráfico de empréstimo por periodo
     * @param period
     */
    private updateChartByPeriod(period: 'week' | 'month' | 'year'): void {
        const loansGrouped = this.groupLoansByPeriod(this.loans, period);
        const periodLabels = Object.keys(loansGrouped).sort();
        const loansCount = periodLabels.map((label) => loansGrouped[label]);
        const maxLoans = Math.max(...loansCount);

        // Criar uma nova instância de dataChartLoans para forçar atualização do gráfico
        this.dataChartLoans = {
            labels: periodLabels,
            datasets: [
                {
                    ...this.dataChartLoans.datasets[0], // Mantém as configurações originais
                    label: `Total de Empréstimos por ${this.getPeriodLabel(period)}`,
                    data: loansCount,
                },
            ],
        };

        // Criar uma nova instância de optionsChartLoans para forçar atualização do título
        this.optionsChartLoans = {
            ...this.optionsChartLoans,
            plugins: {
                ...this.optionsChartLoans.plugins,
                title: {
                    ...this.optionsChartLoans.plugins?.title,
                    text: `Distribuição de Empréstimos por ${this.getPeriodLabel(period)}`,
                },
            },
            scales: {
                ...this.optionsChartLoans.scales,
                y: {
                    ...(this.optionsChartLoans.scales?.['y'] ?? {}),
                    max: maxLoans + 10,
                },
            },
        };
    }

    /**
     * Popula e configura gráfico de empréstimos com base no parcelamento
     * @param loans
     */
    private initConfigsLoansInstallmentChart(loans: Array<Loan>) {
        const colorsMapping: Record<InstallmentPeriodEnum, { background: string; border: string }> = {
            [InstallmentPeriodEnum.MESES_6]: { background: 'rgba(255, 99, 132, 0.7)', border: 'rgba(255, 99, 132, 1)' },
            [InstallmentPeriodEnum.MESES_12]: {
                background: 'rgba(54, 162, 235, 0.7)',
                border: 'rgba(54, 162, 235, 1)',
            },
            [InstallmentPeriodEnum.MESES_18]: {
                background: 'rgba(255, 206, 86, 0.7)',
                border: 'rgba(255, 206, 86, 1)',
            },
            [InstallmentPeriodEnum.MESES_24]: {
                background: 'rgba(75, 192, 192, 0.7)',
                border: 'rgba(75, 192, 192, 1)',
            },
            [InstallmentPeriodEnum.MESES_30]: {
                background: 'rgba(153, 102, 255, 0.7)',
                border: 'rgba(153, 102, 255, 1)',
            },
            [InstallmentPeriodEnum.MESES_36]: {
                background: 'rgba(255, 159, 64, 0.7)',
                border: 'rgba(255, 159, 64, 1)',
            },
            [InstallmentPeriodEnum.MESES_42]: { background: 'rgba(0, 123, 255, 0.7)', border: 'rgba(0, 123, 255, 1)' },
            [InstallmentPeriodEnum.MESES_48]: { background: 'rgba(0, 200, 83, 0.7)', border: 'rgba(0, 200, 83, 1)' },
        };

        // Agrupar os empréstimos por período
        const loansByPeriod = loans.reduce((acc, loan) => {
            const key = InstallmentPeriodEnum[
                loan.periodoParcelamento as unknown as keyof typeof InstallmentPeriodEnum
            ] as number;
            acc[key] = (acc[key] || 0) + 1; // Usa número como chave
            return acc;
        }, {} as Record<number, number>);

        // Obter os períodos presentes e ordená-los do maior para o menor
        const sortedPeriods = Object.keys(loansByPeriod)
            .map((key) => Number(key) as InstallmentPeriodEnum)
            .sort((a, b) => a - b);

        // Preparar os labels e os valores para o gráfico
        const labels = sortedPeriods.map((period) => `${period} meses`);
        const counts = sortedPeriods.map((period) => loansByPeriod[period]);
        const maxCounts = Math.max(...counts);

        // Obter os arrays de cores de fundo e borda de acordo com a ordem dos períodos
        const backgroundColors = sortedPeriods.map((period) => colorsMapping[period].background);
        const borderColors = sortedPeriods.map((period) => colorsMapping[period].border);

        // Configuração dos dados para o Chart.js (gráfico de barras)
        this.dataChartLoansInstallment = {
            labels: labels,
            datasets: [
                {
                    label: 'Total de Empréstimos',
                    data: counts,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };

        // Opções do gráfico (exemplo)
        this.optionsChartLoansInstallment = {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Empréstimos por Prazo de Parcelamento' },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxCounts + 10,
                    ticks: {
                        stepSize: 1,
                        precision: 0,
                    },
                },
            },
        };
    }
    // EndRegion private methods
}

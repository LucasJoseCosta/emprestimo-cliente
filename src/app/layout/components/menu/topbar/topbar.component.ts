import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    standalone: false,
})
export class TopbarComponent implements OnInit {
    // Region public props
    @Input()
    public items: MenuItem[] = [];
    // EndRegion public props
    // Region private props

    // EndRegion private props

    constructor() {}

    ngOnInit(): void {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                url: '/',
                target: '_self',
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-money-bill',
                items: [
                    {
                        label: 'Lista Empréstimos',
                        icon: 'pi pi-receipt',
                        url: '/emprestimos',
                        target: '_self',
                    },
                    {
                        label: 'Simular Empréstimo',
                        icon: 'pi pi-receipt',
                        url: '/emprestimos/simulador',
                        target: '_self',
                    },
                ],
            },
            {
                label: 'Clientes',
                icon: 'pi pi-users',
                url: '/clientes',
                target: '_self',
            },
        ];
    }

    // Region public methods

    // EndRegion public methods

    // Region private methods

    // EndRegion private methods
}

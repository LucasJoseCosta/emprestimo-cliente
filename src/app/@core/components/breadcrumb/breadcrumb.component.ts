import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    standalone: false,
})
export class BreadcrumbComponent {
    // Region input props
    @Input() items!: Array<MenuItem>;
    // EndRegion input props

    // Region public props
    public home: MenuItem;
    // EndRegion public props

    // Region constructor
    constructor() {
        this.home = { routerLink: '/' };
    }
    // Endregion constructor
}

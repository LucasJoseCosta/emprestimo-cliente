import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class DialogConfirmationService {
    /**
     * Serviço de confirmation dialog
     */
    private readonly confirmationService: ConfirmationService;

    // Region constructor
    constructor(confirmationService: ConfirmationService) {
        // Injects
        this.confirmationService = confirmationService;
    }
    // EndRegion constructor

    /**
     * Abre dialog de confirmação
     * @param confirmation
     */
    public confirmDialog(confirmation: Confirmation) {
        this.confirmationService.confirm(confirmation);
    }
}

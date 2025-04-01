import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    // Region private props
    /**
     *  Serviço de mensagem prime
     */
    private readonly messageService: MessageService;
    // Endregion private props

    // Region constructor
    constructor(messageService: MessageService) {
        this.messageService = messageService;
    }
    // Endregion constructor

    // Region public methods
    /**
     * Mostrar feedback de sucesso
     * @param summary
     * @param detail
     */
    public showSuccess(summary: string, detail: string): void {
        this.messageService.add({ severity: 'success', summary, detail });
    }
    /**
     * Mostra feedback de erro
     * @param summary ;
     * @param detail
     */
    public showError(summary: string, detail: string): void {
        this.messageService.add({ severity: 'error', summary, detail });
    }

    /**
     * Mostra feedback de informação
     * @param summary
     * @param detail
     */
    public showInfo(summary: string, detail: string): void {
        this.messageService.add({ severity: 'info', summary, detail });
    }

    /**
     * Mostra feedback de aviso
     * @param summary ;
     * @param detail
     */
    public showWarning(summary: string, detail: string): void {
        this.messageService.add({ severity: 'warn', summary, detail });
    }
    // Endregion public methods
}

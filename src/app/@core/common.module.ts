import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        InputGroupModule,
        InputTextModule,
        InputMaskModule,
        SelectModule,
        ButtonModule,
        DatePickerModule,
        InputIconModule,
        InputNumberModule,
        PanelModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        InputGroupModule,
        InputTextModule,
        InputMaskModule,
        SelectModule,
        ButtonModule,
        DatePickerModule,
        InputIconModule,
        InputNumberModule,
        PanelModule,
    ],
})
export class CoreCommonModule {}

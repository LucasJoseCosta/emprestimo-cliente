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
    ],
})
export class CoreCommonModule {}

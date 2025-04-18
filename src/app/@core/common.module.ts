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
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StepsModule } from 'primeng/steps';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabsModule } from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SkeletonComponentModule } from './components';
import { ChartComponentModule } from './components/chart/chart.module';

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
        ToastModule,
        BreadcrumbModule,
        StepsModule,
        AutoCompleteModule,
        ConfirmDialogModule,
        TabsModule,
        ChartModule,
        SelectButtonModule,
        TagModule,
        SkeletonComponentModule,
        ChartComponentModule,
        FloatLabelModule,
        PasswordModule,
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
        ToastModule,
        BreadcrumbModule,
        StepsModule,
        AutoCompleteModule,
        ConfirmDialogModule,
        TabsModule,
        ChartModule,
        SelectButtonModule,
        TagModule,
        SkeletonComponentModule,
        ChartComponentModule,
        FloatLabelModule,
        PasswordModule,
    ],
    providers: [ConfirmationService, MessageService],
})
export class CoreCommonModule {}

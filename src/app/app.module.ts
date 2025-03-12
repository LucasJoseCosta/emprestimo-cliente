import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouterModule } from './app-router.module';
import { provideHttpClient } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRouterModule, LayoutModule],
    providers: [
        provideHttpClient(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: false || 'none',
                },
            },
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

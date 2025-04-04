import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../shared/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false,
})
export class LoginComponent implements OnInit {
    // Region public props
    public loginForm!: UntypedFormGroup;
    // Endregion public props

    // Region private props
    private _formBuilder: UntypedFormBuilder;

    private readonly authService: AuthenticateService;

    private readonly router: Router;
    // Endregion private props

    // Region constructor
    constructor(_formBuilder: UntypedFormBuilder, authService: AuthenticateService, router: Router) {
        //Init props
        this._formBuilder = _formBuilder;

        //Injectables
        this.authService = authService;
        this.router = router;

        this.authService.removeToken();
    }
    // Endregion constructor

    // Region lifecycle
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }
    // Endregion lifecycle

    // Region public methods
    public onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.loginForm.value).subscribe(
            (user) => {
                if (user) {
                    this.authService.addToken(user.token);
                    this.router.navigate(['/dashboard']);
                } else {
                    console.error('Login failed: Invalid token');
                }
            },
            (error) => {
                console.error('Login failed', error);
            }
        );
    }
    // EndRegion public methods
}

export type Token = {
    /**
     * Token utilizado para autenticar
     */
    token: string;
    /**
     * Data de expiração do token.
     */
    expires: Date;
};

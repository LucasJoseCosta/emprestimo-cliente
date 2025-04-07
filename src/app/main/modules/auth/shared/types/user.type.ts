import { UserRole } from './user-roles.enum';

export type User = {
    id?: number;
    username: string;
    password?: string;
    role?: UserRole;
    first_name?: string;
    last_name?: string;
};

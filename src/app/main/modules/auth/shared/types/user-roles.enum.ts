export enum UserRole {
    ADMIN = 'admin', // Acesso total ao sistema
    SUPER_ADMIN = 'super_admin', // Super usuário, acima do admin comum
    USER = 'user', // Usuário comum
    MANAGER = 'manager', // Gerente com acesso a alguns módulos
    MODERATOR = 'moderator', // Pode moderar conteúdo, usuários etc.
    SUPPORT = 'support', // Suporte técnico ou atendimento
    GUEST = 'guest', // Acesso restrito, geralmente só leitura
    DEVELOPER = 'developer', // Acesso técnico ao sistema
    ANALYST = 'analyst', // Pode acessar relatórios e análises
    OPERATOR = 'operator', // Executa ações específicas, como operadores de sistema
}

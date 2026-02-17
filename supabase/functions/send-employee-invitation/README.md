# Send Employee Invitation Edge Function

Esta é uma Supabase Edge Function que envia emails de convite para employees usando **Gmail SMTP**.

## Setup

### 1. Instale a CLI do Supabase

```bash
npm install -g supabase
```

### 2. Configure suas credenciais

```bash
supabase login
```

### 3. Você Já Tem as Variáveis Configuradas!

Você já possui os secrets `GMAIL_USER` e `GMAIL_PASSWORD` configurados no Supabase. A Edge Function vai usar exatamente esses mesmos secrets. 

Nenhuma configuração adicional é necessária! ✅

### 4. Deploy a função

```bash
supabase functions deploy send-employee-invitation
```

### 5. Teste a função (opcional)

```bash
supabase functions invoke send-employee-invitation \
  --body '{
    "email": "teste@example.com",
    "firstName": "João",
    "lastName": "Silva",
    "employeeRegistrationNumber": "EMP123",
    "invitationUrl": "http://localhost:5173/employee/register?email=teste@example.com"
  }'
```

## Como Funciona

1. Quando um employer cria um employee
2. A função é chamada automaticamente
3. Um email de convite é enviado via Gmail SMTP (usando `GMAIL_USER` e `GMAIL_PASSWORD`)
4. O employee recebe o email com link para completar o registro

## Troubleshooting

- **Erro "Gmail credentials not configured"**: Verifique se `GMAIL_USER` e `GMAIL_PASSWORD` estão realmente configurados
- **Email não enviado**: Certifique-se que `GMAIL_PASSWORD` é a senha de app do Gmail (16 caracteres)
- **Erro 535 Authentication failed**: A senha de app pode estar expirada ou incorreta

## Ver os Logs

```bash
supabase functions logs send-employee-invitation
```



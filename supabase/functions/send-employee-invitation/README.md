# Send Employee Invitation Edge Function

Esta função envia emails de convite de employee usando **Resend**.

## Setup

### 1. Login no Supabase CLI

```bash
supabase login
```

### 2. Configure os secrets do Resend

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
supabase secrets set RESEND_FROM_EMAIL=onboarding@resend.dev
```

Use um remetente válido no Resend (domínio verificado ou `onboarding@resend.dev` para testes).

### 3. Deploy da função

```bash
supabase functions deploy send-employee-invitation
```

### 4. Teste da função (opcional)

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

## Ver os Logs

```bash
supabase functions logs send-employee-invitation
```



# Como Deployar a Edge Function de Convite de Employee (Resend)

## 1) Login no Supabase CLI

```bash
supabase login
```

## 2) Configurar secrets do Resend

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
supabase secrets set RESEND_FROM_EMAIL=onboarding@resend.dev
```

`RESEND_FROM_EMAIL` precisa ser um remetente válido no Resend (domínio verificado ou `onboarding@resend.dev` para testes).

## 3) Deploy da função

```bash
supabase functions deploy send-employee-invitation
```

## 4) Ver logs (se necessário)

```bash
supabase functions logs send-employee-invitation
```

Pronto: ao criar employee, o sistema envia convite via Resend automaticamente.



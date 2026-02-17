# Como Deployar a Edge Function de Convite de Employee

## Excelente Notícia! 🎉

Você já tem `GMAIL_USER` e `GMAIL_PASSWORD` configurados no Supabase. A Edge Function vai usar exatamente esses mesmos secrets.

**Nenhuma configuração adicional é necessária!**

## Passo Único: Deploy a Função

Abra o terminal na raiz do projeto e execute:

```bash
supabase login
```

(Se pedir, faça login com sua conta Supabase)

Depois:

```bash
supabase functions deploy send-employee-invitation
```

Pronto! ✅

## Pronto! ✅

Agora quando um employer criar um employee:
1. O employee será salvo no banco
2. Automaticamente um email de convite será enviado (via Gmail SMTP usando `GMAIL_USER` e `GMAIL_PASSWORD`)
3. O email conterá um link para a página de registro com dados pré-preenchidos

---

## Ver os Logs da Função

Se precisar debugar:

```bash
supabase functions logs send-employee-invitation
```

É isso! Sem precisa de nada novo, você já tem tudo que precisa configurado. 🚀



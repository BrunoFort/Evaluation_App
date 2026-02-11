# Checklist de Problemas com Upload de Foto

## 1. localStorage (Armazenamento Local)

### Verificar se localStorage está funcionando:
```javascript
// Cole no console do navegador
localStorage.setItem("__test__", "teste");
const teste = localStorage.getItem("__test__");
console.log("localStorage funciona:", teste === "teste");
localStorage.removeItem("__test__");
```

### Verificar se a foto está sendo salva:
```javascript
// Cole no console após enviar foto em /employer/register
const foto = localStorage.getItem("employer-register-photo");
console.log("Foto em localStorage:", foto ? `SIM (${(foto.length / 1024 / 1024).toFixed(2)} MB)` : "NÃO");
```

---

## 2. Supabase Storage (Bucket)

### Verificar que o bucket existe:
1. Ir para Supabase Dashboard > Storage
2. Provar que bucket `shine-assets` existe
3. Verificar se há pasta `profile-photos/` dentro

### Verificar RLS Policies:

**Importante**: Se as políticas RLS estão muito restritivas, o upload vai falhar silenciosamente.

1. Ir para Supabase Dashboard > Storage > `shine-assets`
2. Clicar em "Policies"
3. Deve ter algo como:

```sql
-- Permitir usuários fazer upload em sua própria pasta
CREATE POLICY "Usuários podem fazer upload em sua pasta"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'shine-assets' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### Se não houver policies, criar uma simples para testar:

```sql
-- Permitir qualquer Upload (APENAS PARA DEBUG)
CREATE POLICY "Permitir upload de teste"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'shine-assets');

-- Permitir leitura pública
CREATE POLICY "Permitir leitura pública"
ON storage.objects
FOR SELECT
USING (bucket_id = 'shine-assets');
```

---

## 3. Verificar Acesso ao Supabase

### Ver se está autenticado:
```javascript
// Cole no console após fazer login
const { data } = await supabase.auth.getUser();
console.log("Usuário autenticado:", data?.user ? `SIM (${data.user.id})` : "NÃO");
```

### Testar upload direto:
```javascript
// Cole no console após fazer login
const blob = new Blob(['teste'], { type: 'text/plain' });
const { data, error } = await supabase.storage
  .from('shine-assets')
  .upload(`test/${Date.now()}-test.txt`, blob);

console.log("Upload bem-sucedido:", !error);
if (error) console.error("Erro do upload:", error);
```

---

## 4. Problemas Comuns

### ❌ "TypeError: Cannot read property 'upload' of undefined"
- Bucket `shine-assets` não existe
- **Solução**: Criar bucket no Supabase Dashboard > Storage

### ❌ "Policy violation"
- RLS policies estão bloqueando o acesso
- **Solução**: Verificar/atualizar policies (veja seção 2)

### ❌ Upload silencioso (sem erro, mas arquivo não aparece)
- Sessão expirada
- Permissões insuficientes
- **Solução**: Fazer logout e login novamente, ou verificar RLS policies

### ❌ localStorage retorna null ou tamanho 0
- localStorage foi limpo
- Quota excedida do navegador
- LocalStorage desabilitado
- **Solução**: Verificar se localStorage tem permissão, limpar cache do navegador

---

## 5. Fluxo Correto de Upload

### Durante Registro (`/employer/register`):
1. ✅ Usuário seleciona foto
2. ✅ Foto é convertida para Data URL (arquivo em memória)
3. ✅ Data URL é salva em localStorage com chave `employer-register-photo`
4. ✅ Usuário preenche formulário
5. ✅ Ao enviar, usuário é criado no auth (sem fazer upload da foto)
6. ✅ Redirecionado para `/employer/login` para verificar email

### Após verificar Email e fazer login (em `/employer/settings`):
1. ✅ Page carrega e checa localStorage para `employer-register-photo`
2. ✅ Se encontrar:
   - Converte Data URL para Blob
   - Faz upload para Supabase Storage
   - Atualiza auth metadata com avatar_url
   - Remove de localStorage
3. ✅ Se não encontrar, apenas carrega avatar existente

---

## 6. Debug Steps

Abra o Console (F12) e execute estes comandos na página de registro:

### 1. Depois de selecionar foto:
```javascript
console.log("1. Foto em localStorage:", localStorage.getItem("employer-register-photo") ? "✅ SIM" : "❌ NÃO");
```

### 2. Depois de enviar registro:
```javascript
console.log("2. Redirecionado?", window.location.pathname);
console.log("3. Foto ainda em localStorage?", localStorage.getItem("employer-register-photo") ? "✅ SIM" : "❌ NÃO");
```

### 3. Depois de fazer login:
```javascript
console.log("4. Usuário autenticado?", (await supabase.auth.getUser()).data?.user ? "✅ SIM" : "❌ NÃO");
console.log("5. Foto em localStorage?", localStorage.getItem("employer-register-photo") ? "✅ SIM" : "❌ NÃO");
```

### 4. Na página de settings:
```javascript
// O console deve mostrar logs de "Inicialização de foto"
// Se não, quer dizer que o useEffect não foi executado (verifique se employerId está disponível)
```

---

## 7. Se Ainda Não Funcionar

### Possíveis razões:
1. localStorage está desabilitado no navegador
2. Cookie/sessionStorage foi limpo automaticamente
3. RLS policies estão bloqueando
4. Bucket não tem permissão de escrita
5. Autenticação expirou entre registro e login

### O que coletar para debug:
- Print do console durante todo o fluxo
- URL exata da página onde está testando
- Tamanho da foto (em MB)
- Tipo do navegador (Chrome, Safari, Firefox, Edge)
- Se está em localhost ou produção

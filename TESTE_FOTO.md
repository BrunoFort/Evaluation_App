# Como Testar Upload de Foto - Passo a Passo

## Requisitos Prévios

1. **Verificar Supabase Storage**
   - Bucket `shine-assets` deve existir
   - Deve ter pasta `profile-photos/` (ou será criada automaticamente)

2. **Verificar RLS Policies** (Supabase Dashboard > Storage > shine-assets > Policies)
   - Se não houver nenhuma policy, criar uma permissiva para teste:
   ```sql
   -- Permitir autenticados fazer upload
   CREATE POLICY "Permitir upload"
   ON storage.objects
   FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'shine-assets');
   
   -- Permitir leitura pública
   CREATE POLICY "Leitura pública"
   ON storage.objects
   FOR SELECT
   USING (bucket_id = 'shine-assets');
   ```

---

## Teste Prático

### 1. Abra o Navegador em `/employer/register`

Abra DevTools (F12) > Console

### 2. Envie uma Foto

- Clique em "Enviar foto"
- Selecione uma imagem JPG ou PNG pequena (< 1 MB)
- **Esperado no console:**
  ```
  📖 Lendo arquivo como Data URL: arquivo.jpg (50 KB)
  ✅ Data URL criada com sucesso (66.67 KB)
  ✅ Foto salva em localStorage (0.07 MB) com chave: employer-register-photo
  ```

### 3. Preencha e Envie o Registro

- Complete o formulário normalmente
- Clique em "Registrar"
- **Esperado no console:**
  ```
  📝 Passo 1: Criando usuário de autenticação...
  ✅ Usuário de autenticação criado - userId: [ID]
  📝 Passo 2: Verificando foto pendente...
  ✅ Foto encontrada em localStorage - [TAMANHO] caracteres
  📝 Passo 3: Registrando empregador via RPC...
  ✅ Empregador registrado com sucesso
  📝 Passo 4: Redirecionando para login com aviso de verificação...
  ```

### 4. Verificar Email

- Abra sua caixa de entrada
- Procure por email de "Evaluation App"
- Clique no link de verificação
- Será redirecionado para `/employer/login`

### 5. Fazer Login

- Use o email e senha registrados
- **Após clicar em "Login", esperado no console:**
  ```
  ✅ Foto carregada de localStorage (0.07 MB) com chave: employer-register-photo
  ```

### 6. Navegar para Settings

- Após login bem-sucedido, ir para `/employer/settings`
- **Esperado no console:**
  ```
  🔵 Inicialização de foto - employerId: [ID]
  ✅ Foto carregada de localStorage (0.07 MB) com chave: employer-register-photo
  🔵 Convertendo Data URL para Blob...
  🖼️ dataUrlToBlob - tamanho da entrada: [TAMANHO]
  ✅ Blob criado com sucesso - [KB] bytes
  🔵 Enviando foto para Supabase...
  📸 uploadProfilePhoto chamado - userId: [ID], fileName: profile.jpg, fileSize: [BYTES], role: employer
  📸 Caminho de upload: profile-photos/employer/[ID]/[TIMESTAMP]-profile.jpg
  ✅ Arquivo enviado para Supabase - uploadData: {...}
  ✅ URL pública gerada: https://...
  🔵 Atualizando avatar de autenticação...
  ✅ Avatar de autenticação atualizado
  🔵 Estado de URL de foto atualizado para: https://...
  🔵 Removendo foto pendente de localStorage
  ✅ Foto removida de localStorage com chave: employer-register-photo
  ```

### 7. Verificar Resultado

- A foto deve aparecer no uploader de foto na página de settings
- No Supabase Dashboard > Storage > shine-assets, deve ter:
  - Pasta: `profile-photos/employer/[ID]/`
  - Arquivo: `[TIMESTAMP]-profile.jpg`

---

## Se Algo Não Funcionar

### Cenário 1: Foto não é salva em localStorage
**Console mostra:** `❌ Erro ao salvar foto: ...`

**Causas:**
- localStorage desabilitado no navegador
- Quota de armazenamento excedida
- Arquivo muito grande

**Solução:**
- Usar foto menor (< 500 KB)
- Limpar localStorage: `localStorage.clear()` no console
- Verificar se localStorage está habilitado em Configurações do Navegador

---

### Cenário 2: Foto não é encontrada em localStorage após login
**Console não mostra nada sobre foto**

**Causas:**
- Cookie/cache foi limpo automaticamente
- localStorage foi deletado
- Chave diferente está sendo usada

**Solução:**
- Verificar em settings se `localStorage.getItem("employer-register-photo")` retorna algo
- Se vazio, tentar register novamente com uma foto pequena

---

### Cenário 3: Upload falha no Supabase
**Console mostra:** `❌ Supabase upload error: ...` ou `❌ Erro na deleção de foto: ...`

**Causas:**
- RLS policies bloqueando acesso
- Bucket não existe
- Sessão autenticação expirou

**Solução:**
- Verificar RLS policies no Supabase Dashboard
- Fazer logout e login novamente
- Checar se bucket `shine-assets` existe

---

### Cenário 4: Arquivo aparece no Storage mas não no Settings
**Arquivo está em** `profile-photos/employer/[ID]/` **mas foto não aparece**

**Causa:**
- CSS/componente não está renderizando a imagem

**Solução:**
- Verificar DevTools > Network se a imagem está sendo carregada
- Verificar se `photoUrl` state está sendo atualizado
- Limpar cache do navegador (Ctrl+Shift+Del)

---

## Debug Rápido no Console

Se algo falhar, execute esto no console:

```javascript
// 1. Verificar localStorage
const foto = localStorage.getItem("employer-register-photo");
console.log("Foto em localStorage:", foto ? `SIM (${(foto.length / 1024).toFixed(2)} KB)` : "NÃO");

// 2. Verificar autenticação
const user = (await supabase.auth.getUser()).data?.user;
console.log("Usuário autenticado:", user ? `SIM (${user.id})` : "NÃO");
console.log("Avatar nos metadados:", user?.user_metadata?.avatar_url ? "SIM" : "NÃO");

// 3. Limpar foto se precisar recomeçar
localStorage.removeItem("employer-register-photo");
console.log("localStorage limpo!");
```

---

## Checklist de Sucesso

- [ ] Foto é selecionada e aparece no preview
- [ ] localStorage salva a foto (vê log `✅ Foto salva em localStorage`)
- [ ] Registro é criado com sucesso
- [ ] Email de verificação recebido
- [ ] Login funciona após verificação
- [ ] Console em settings mostra logs de upload
- [ ] Arquivo aparece no Supabase Storage (bucket > profile-photos)
- [ ] Foto aparece no settings page após fazer upload
- [ ] Foto persiste após refrescar a página

# Photo Upload Debugging Guide

## Problem

Photo uploaded during employer registration is not persisting to Supabase bucket after email verification and login.

## Solution Implemented
Added comprehensive logging throughout the photo upload flow to identify where the process breaks.

## What Changed

### 1. **Consolidated Photo Initialization** (`src/app/(dashboard)/employer/settings/page.jsx`)
- **Before**: Two separate `useEffect` hooks that both depended on `employer?.employerId`, potentially causing race conditions
- **After**: Single consolidated `useEffect` that:
  1. Checks for pending photo in localStorage first
  2. If found: converts to blob → uploads to Supabase → updates auth metadata
  3. If not found: loads existing avatar from auth metadata
  4. Includes fallback error handling

### 2. **Detailed Upload Logging** (`src/features/shared-photo/supabasePhotoStorage.js`)
- `uploadProfilePhoto()` now logs:
  - Input validation (userId, file existence)
  - Upload path calculation
  - Upload success/failure with error details
  - Public URL generation
  
### 3. **Blob Conversion Logging** (`src/features/shared-photo/supabasePhotoStorage.js`)
- `dataUrlToBlob()` now logs:
  - Input data URL length
  - MIME type detected
  - Blob size in bytes
  - Any conversion errors with full stack

## Debug Instructions

### Step 1: Test the Registration Flow
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Navigate to http://localhost:5174/employer/register
4. Fill out the registration form
5. **Upload a profile photo** (important!)
6. Submit the form
7. **Watch the console** - you should see logs like:
   ```
   🖼️ dataUrlToBlob - input length: 12345
   🖼️ header: data:image/jpeg;base64
   🖼️ mime type: image/jpeg
   ✅ Blob created successfully - 8432 bytes
   ```

### Step 2: Verify Email & Login
1. Check your email for the verification link
2. Click the verification link (it redirects to login page)
3. Log in with the employer account
4. **Watch the console** - you should see logs like:
   ```
   🔵 Photo initialization - employerId: abc123def456...
   🔵 pendingPhoto from localStorage: found (123456 chars)
   🔵 Converting data URL to blob...
   🖼️ dataUrlToBlob - input length: 123456
   ✅ Blob created successfully - 87654 bytes
   🔵 Uploading photo to Supabase...
   📸 uploadProfilePhoto called - userId: abc123... fileName: profile.jpg fileSize: 87654 role: employer
   📸 Upload path: profile-photos/employer/abc123.../1234567890-profile.jpg
   ✅ File uploaded to Supabase - uploadData: {...}
   ✅ Public URL generated: https://...
   🔵 Upload result: {publicUrl: "https://...", path: "profile-photos/..."}
   🔵 Updating auth avatar...
   🔵 Auth avatar updated
   🔵 Photo URL state updated to: https://...
   🔵 Removing pending photo from localStorage
   ```

### Step 3: Verify Photo Appears in Settings
1. You should be redirected to `/employer/login` after registration
2. Log in with your employer email/password
3. Navigate to settings page
4. The photo should display in the profile photo uploader

## What to Look For If Issues Occur

### Issue: "No pending photo in localStorage"
- **Cause**: Photo wasn't saved during registration
- **Check**: In registration page, after uploading photo, did you see:
  ```
  ✅ Blob created successfully - XXXX bytes
  ```
  in the console before submitting the form?

### Issue: "Blob conversion failed"
- **Cause**: Data URL is corrupted or incomplete
- **Check**: Look for error message in `dataUrlToBlob` logs
- **Fix**: Make sure the photo upload completes fully before submitting the form

### Issue: "Upload fails with error"
- **Cause**: Supabase Storage permissions or bucket issues
- **Check**: Full error message should appear as:
  ```
  ❌ Supabase upload error: {error details}
  ```
- **Common reasons**:
  - Storage bucket `shine-assets` doesn't exist
  - RLS policies blocking the upload
  - User authentication token expired

### Issue: "Auth avatar update fails"
- **Cause**: Can't update user metadata
- **Check**: Look for error in `updateAuthAvatar` call
- **Fix**: Verify Supabase auth token is still valid

## Key Console Log Markers

| Marker | Meaning | Status |
|--------|---------|--------|
| 🟢 ✅ | Success operation | Good |
| 🔵 | Info/Progress step | Informational |
| 🟡 ⚠️ | Warning | Caution |
| 🟠 ❌ | Error | Problem |
| 📸 | Photo upload operation | Informational |
| 🖼️ | Blob conversion operation | Informational |

## Testing Checklist

- [ ] Photo uploaded during registration shows in DevTools console
- [ ] Blob conversion succeeds (shows byte size)
- [ ] Email verification works and redirects to login
- [ ] Login page shows verification banner
- [ ] After login, settings page logs "Photo initialization"
- [ ] Settings page finds pending photo in localStorage
- [ ] Upload to Supabase succeeds (shows public URL)
- [ ] Auth avatar metadata is updated
- [ ] Photo appears in settings page uploader
- [ ] Photo is visible in Supabase bucket under `profile-photos/employer/{userId}/`
- [ ] Refreshing settings page shows the photo persisted

## localStorage Key Reference

- **Registration photo**: `employer-register-photo` (cleared after successful upload)
- **Employee registration photo** (if implemented): `employee-register-photo`

## File Structure

```
src/
├── app/(dashboard)/employer/settings/page.jsx     # Upload trigger on init
├── features/shared-photo/
│   ├── supabasePhotoStorage.js                    # Upload & blob functions
│   ├── photoStorage.js                            # localStorage helpers
│   └── ProfilePhotoUploader.jsx                   # UI component
└── app/(public)/employer/register/page.jsx        # Registration form
```

## Next Steps

Once photo upload works:
1. ✅ Consolidate logging into reusable utility
2. Apply same flow to employee registration
3. Add employee settings photo management
4. Remove debug logs for production

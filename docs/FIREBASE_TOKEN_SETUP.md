# Firebase Token Setup for GitHub Actions

## Refresh token (when deploy fails with "credentials are no longer valid")

1. **Generate a new CI token** (run in your project directory or anywhere with Firebase CLI):
   ```bash
   firebase login:ci
   ```
   - Browser opens → sign in with the Google account that has access to the **newtifi-web** Firebase project.
   - Copy the **entire** token from the terminal (starts with `1//`).

2. **Update the GitHub secret**:
   - Open: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions
   - Click **FIREBASE_TOKEN** → **Update** (or delete and create new with the same name).
   - Paste the new token as the value → save.

3. **Re-run the workflow**:
   - Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/actions
   - Open the failed "Deploy to Firebase Hosting" run → **Re-run all jobs**.

---

## Quick Setup (first time)

1. **Generate CI Token** (run in your terminal):
   ```bash
   firebase login:ci
   ```
   - This will open a browser for authentication
   - After authenticating, you'll get a token (starts with `1//` followed by a long string)
   - Copy the entire token - you'll need it for the next step

2. **Add Token to GitHub Secrets**:
   - Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `FIREBASE_TOKEN`
   - Value: (paste the entire token from step 1)
   - Click **"Add secret"**

3. **Verify**:
   - The secret should now appear in your repository secrets
   - The next GitHub Actions workflow run should use this token

## Important Notes

- ⚠️ **CI tokens CAN expire** (expiration time varies, typically weeks to months)
- **Keep the token secret** - never commit it to the repository
- If the token is compromised or expired, generate a new one and update the secret
- When token expires, you'll see: "Authentication Error: Your credentials are no longer valid"

## Troubleshooting

If deployment fails:
1. Verify the token was copied completely (no extra spaces or line breaks)
2. Check the workflow logs in GitHub Actions for specific error messages
3. Ensure the secret name is exactly `FIREBASE_TOKEN` (case-sensitive)
4. Regenerate the token if needed: `firebase login:ci`

## Current Status

⚠️ **If Actions fail with "Your credentials are no longer valid"** — refresh the token using the steps in **Refresh token** above, then re-run the workflow.

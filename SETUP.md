# Tanza Survey — Setup

Two pieces now, hosted separately:
- **`Code.gs` + `Fields.gs`** — deployed to Apps Script as a JSON API (no longer serves the HTML page).
- **`Index.html`** — hosted on GitHub Pages (or any static host), calls the Apps Script API via `fetch()`.

**Why split like this:** Apps Script Web Apps load pages inside a sandboxed iframe. Desktop browsers mostly tolerate this, but mobile Chrome/Safari block `getUserMedia()` (microphone access) inside that iframe — so the voice-recording feature silently failed on phones ("Microphone access denied") even when permissions were fine. Hosting `Index.html` on its own domain removes the iframe and fixes this.

The old `Tanza_Survey_FormBuilder.gs` (native Google Form) is unused — delete it or leave it unreferenced.

## Deploy — Apps Script (API backend)

1. Go to [script.google.com](https://script.google.com) → New project.
2. Create two files: `Code.gs` and `Fields.gs` (both **Script** type) and paste in this repo's contents. You do **not** need an `Index.html` file in this project anymore.
3. Save, then run `submitSurvey` once from the editor (function dropdown → select it → Run) to trigger the Google auth consent screen. It'll error afterward (no real data was passed) — that's expected. This also creates the "Tanza Survey Responses" Sheet and "Tanza Survey Uploads" Drive folder on first use.
4. Deploy → New deployment → type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the `/exec` URL.
6. Open your local `Index.html`, find the line `var APPS_SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';` near the top of the `<script>` block, and paste the `/exec` URL in there.

## Deploy — GitHub Pages (the form UI)

1. Create a new GitHub repository (public, since GitHub Pages on a free account requires that).
2. Upload `Index.html` to the repo root — rename it to `index.html` (lowercase — GitHub Pages serves `index.html` as the default page).
3. In the repo: **Settings → Pages** → under "Build and deployment", set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)** → **Save**.
4. Wait ~1 minute, then GitHub shows the live URL, typically `https://<your-username>.github.io/<repo-name>/`.
5. Open that URL, test the form end-to-end (including the mic on a phone), then send that URL to tenants — **not** the Apps Script `/exec` URL.

Whenever you edit `Index.html` locally, just re-upload/commit it to the repo — GitHub Pages redeploys automatically in under a minute. Whenever you edit `Code.gs`/`Fields.gs`, you need **Deploy → Manage deployments → pencil icon → New version → Deploy** for changes to go live (the `/exec` URL itself doesn't change, so you never need to re-paste it into `Index.html`).

## Where data goes

- Each submission adds one row to the **Tanza Survey Responses** Sheet (auto-created in your Drive).
- Uploaded files and voice recordings are saved into a per-submission subfolder inside **Tanza Survey Uploads**, and the Sheet row links to each file's URL.
- Both are found via `Project Settings → Script Properties` (`SHEET_ID`, `FOLDER_ID`) if you want to relocate them later.

## Branding

The header shows the **Takhayal** logo (`takhaial_logo.png` — actually a WebP file despite the extension) as the main mark, inlined directly in `Index.html` as a base64 `data:image/webp` URI inside `.brand-mark img`. This keeps the form fully self-contained with no external hosting or Drive-sharing dependency.

To swap the logo later, replace the `src="data:image/webp;base64,...."` value on that `<img>` tag. To regenerate the base64 from a new file:

```js
require('fs').writeFileSync('out.txt', require('fs').readFileSync('new-logo.png').toString('base64'))
```

Then paste the contents of `out.txt` into the `src`, adjusting the mime type (`image/png`, `image/webp`, etc.) to match the actual file format.

## Updating questions

Edit `SECTIONS` in `Index.html` and the matching entries in `FIELD_ORDER` in `Fields.gs` — **both must stay in sync** (same `key`s and `type`s), since the backend uses `Fields.gs` to build Sheet columns and decide which fields are file/voice uploads.

# MedStudentHub — GitHub Pages setup

This project is configured for:

`https://tahseen-nazir.github.io/medstudenthub/`

## 1. Upload the project
Replace the contents of the `main` branch of your `medstudenthub` repository with the contents of this folder.

Do not upload `node_modules`; it is not included in the ZIP.

## 2. Enable GitHub Pages
GitHub repository → Settings → Pages → Build and deployment → Source → **GitHub Actions**.

## 3. Deploy
Commit/push to `main`. The workflow in `.github/workflows/deploy.yml` will install dependencies, build the Vite app, and publish `dist`.

## 4. Open
After the Actions workflow finishes, open:

https://tahseen-nazir.github.io/medstudenthub/

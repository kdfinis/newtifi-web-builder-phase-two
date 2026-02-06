# public/files

Canonical repository for ALL non-article files that the website serves or lets users download.

Rules
- Put every non-article asset here (PDFs, CSVs, JSON, docs, images for download).
- Reference in code via absolute path `/files/<filename>`.
- For subfolders, use `/files/<folder>/<filename>` and keep names URL-safe.
- Articles continue to live under `public/articles/`.
- Mirror this directory in `newtifi-web-builder/public/files/` if touching the nested app.

For Future AI
- When adding any new data/assets for runtime or download, store them here and update any links to `/files/...`.
- Do not place such files under `src/` (they won’t be statically served).

Research Submissions
- Place all user-uploaded or admin-managed research submission documents under `/public/files/research-submissions/`.
- Create a subfolder per submission or user, e.g. `/public/files/research-submissions/2025-08-09-project-abc/`.
- Public access path example: `/files/research-submissions/2025-08-09-project-abc/proposal.pdf`.

# Contributing

Contributions to Document Viewer are welcome. For local setup, follow the [project README](README.md); it covers the Django/PostgreSQL backend and the React client.

## Workflow

1. Fork the repository and clone your fork.
2. Create a branch for the change: `git checkout -b describe-your-change`.
3. Make a focused change and add or update tests where behavior changes.
4. Run the relevant checks before opening a pull request.
5. Push the branch to your fork and open a pull request describing the change, its motivation, and how you tested it.

## Project checks

Run backend tests from the repository root, with PostgreSQL configured and available:

```bash
python manage.py test
```

Run the frontend lint and production build from `client/`:

```bash
npm run lint
npm run build
```

Follow PEP 8 for Python changes and the existing JavaScript/React patterns in the client. Keep changes scoped, and include migrations when model changes require them.

## Issues and licensing

Report bugs or request features in the [GitHub issue tracker](https://github.com/Apfirebolt/document-viewer-in-react-and-django/issues). Contributions are subject to the project's [LICENSE.md](LICENSE.md).

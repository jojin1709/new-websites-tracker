# Contributing to LaunchRadar

Thank you for your interest in contributing to LaunchRadar! This document provides guidelines and information for contributors.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/jojin1709/new-websites-tracker/issues)
2. If not, open a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)

### Suggesting Features

1. Check existing [Issues](https://github.com/jojin1709/new-websites-tracker/issues) and [Discussions](https://github.com/jojin1709/new-websites-tracker/discussions)
2. Open a new issue with:
   - Clear title
   - Description of the feature
   - Use case
   - Any implementation ideas

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes
5. Commit (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/jojin1709/new-websites-tracker.git
cd new-websites-tracker
npm install
```

### Running Locally

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run scrape # Run scrapers
```

## Code Standards

### JavaScript/React

- Use functional components with hooks
- Follow existing code style
- Add comments for complex logic
- Keep components small and focused

### CSS/Tailwind

- Use Tailwind utility classes
- Follow the existing design system
- Ensure responsive design
- Test on different screen sizes

### Scrapers

- Handle errors gracefully
- Add timeouts to all requests
- Use proper user-agent headers
- Return empty array on failure

## Commit Messages

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep under 72 characters
- Reference issues when applicable

Example:
```
Add Reddit scraper for SideProject subreddit

Closes #42
```

## Pull Request Guidelines

- Fill out the PR template
- Link related issues
- Add screenshots for UI changes
- Ensure CI passes
- Request review from maintainers

## Areas for Contribution

- [ ] Add new data sources
- [ ] Improve scraper reliability
- [ ] Enhance UI/UX
- [ ] Add new features
- [ ] Fix bugs
- [ ] Improve documentation
- [ ] Add tests
- [ ] Performance optimization

## Questions?

If you have questions about contributing, feel free to:

- Open a [Discussion](https://github.com/jojin1709/new-websites-tracker/discussions)
- Reach out on [Twitter](https://twitter.com/jojin1709)

## License

By contributing, you agree that your contributions will be licensed under the [AGPL-3.0 License](LICENSE).

---

Thank you for contributing to LaunchRadar!
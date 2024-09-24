# Contributing to BARK BLINK AS A SERVICE

We appreciate your interest in contributing to BARK BLINK! Whether you're reporting a bug, suggesting new features, or helping improve the documentation, your contributions are valuable to us.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Feature Requests](#feature-requests)
  - [Code Contributions](#code-contributions)
  - [Improving Documentation](#improving-documentation)
- [Development Workflow](#development-workflow)
- [License](#license)

## Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for everyone in our community.

## How Can I Contribute?

### Reporting Bugs

If you encounter a bug, please submit an issue with the following details:
- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected behavior vs actual behavior.
- The environment where the bug occurred (e.g., OS, browser, Node.js version).

### Feature Requests

Do you have ideas for new features or improvements? Open an issue or discussion with the following:
- A clear explanation of the feature or improvement.
- Use cases or examples of why this feature would be useful.
- Potential impact on the current codebase.

### Code Contributions

If you'd like to submit code changes:
1. Fork the repository and clone it locally.
2. Create a new branch for your feature/bugfix: `git checkout -b my-feature`.
3. Make your changes, ensuring code consistency with the project's style guide.
4. Test your changes locally.
5. Commit your changes with a clear message: `git commit -m "Added new feature: XYZ"`.
6. Push your branch: `git push origin my-feature`.
7. Open a Pull Request (PR) and provide details about your changes.

Ensure your PR includes:
- A detailed description of the problem you're solving or the feature you're adding.
- Reference to any relevant issue.
- Any relevant screenshots or logs to support the change.

### Improving Documentation

You can help improve our documentation by:
- Fixing typos or formatting issues.
- Clarifying existing content.
- Adding new sections or guides.

Feel free to create a PR for any documentation improvements.

## Development Workflow

To contribute code or documentation, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/barkprotocol/bark-blink-as-a-service.git
   cd bark-blink-as-a-service
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed, then run:
   ```bash
   pnpm install
   ```

3. **Run the Application**:
   To start the development server, use:
   ```bash
   pnpm run dev
   ```

4. **Testing**:
   Run tests locally before submitting your code:
   ```bash
   npm test
   ```

5. **Submit a Pull Request (PR)**:
   After completing the changes and testing locally, push your branch and open a PR on the main repository.

### Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (sample). Please structure your commit messages like:
- `feat:` for new features.
- `fix:` for bug fixes.
- `docs:` for documentation changes.
- `chore:` for maintenance tasks.
- `refactor:` for code refactoring.

## License

By contributing to BARK BLINK, you agree that your contributions will be licensed under the [Apache 2.0 License](LICENSE).
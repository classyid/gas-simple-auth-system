# GAS Simple Auth System

A lightweight authentication system built with Google Apps Script that uses Google Spreadsheet as a database. This project provides a simple but functional login, registration, and session management system that can be quickly deployed as a web app.

![GAS Simple Auth System Screenshot](https://blog.classy.id/upload/gambar_berita/663afb34739ff33b1bf999e91b9bb778_20250412145134.png)

## Features

- 🔐 User registration with basic validation
- 🔑 Secure login system with password encryption (HMAC-SHA256)
- 📊 Google Spreadsheet as database for user management
- 💾 Session management using Google Apps Script Properties Service
- 📱 Responsive design that works on mobile and desktop
- 🚀 Easy deployment as a Google Web App

## Live Demo

Try the live demo: [GAS Simple Auth System Demo](https://s.id/1dyTpiVA)

## Quick Start Guide

### Option 1: Copy the Google Apps Script project (Recommended)
1. Open [this Google Apps Script project](https://script.google.com/d/your-project-id/edit) (request access if needed)
2. Make a copy: File > Make a copy
3. Set your encryption key in the `Code.gs` file
4. Deploy as a web app (Deploy > New deployment > Web App)

### Option 2: Manual setup
1. Create a new Google Apps Script project at [script.google.com](https://script.google.com)
2. Create two files:
   - `Code.gs`: Copy the content from [Code.gs](Code.gs) in this repository
   - `index.html`: Copy the content from [index.html](index.html) in this repository
3. Update the `ENCRYPTION_KEY` variable in the `Code.gs` file
4. Deploy as a web app (Deploy > New deployment > Web App)

## Detailed Installation & Configuration

See the [Installation Guide](docs/installation.md) for detailed step-by-step instructions.

## Security Considerations

This system provides basic authentication capabilities but has some security limitations:

- Password encryption uses HMAC-SHA256 which is better than plain text but not as secure as bcrypt
- Google Apps Script Properties Service has storage limits for session data
- No CSRF protection is implemented in this basic version
- No rate limiting for login attempts

**For production environments**, we recommend enhancing the security or using dedicated authentication services.

## Customization

You can easily customize:
- The visual design by modifying the CSS in `index.html`
- Form validation rules in the JavaScript code
- User data structure by adding columns to the spreadsheet and updating the code

See [Customization Guide](docs/customization.md) for more details.

## Contributing

Contributions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Share your customizations or extensions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Google Apps Script documentation and community
- All contributors and users providing feedback

---

⭐ If you find this project useful, please consider giving it a star on GitHub! ⭐

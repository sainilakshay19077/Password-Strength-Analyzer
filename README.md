# Password Strength Analyzer

A beginner-friendly cybersecurity mini project built with HTML, CSS and JavaScript.

## Features
- Checks length, lowercase, uppercase, numbers and special characters.
- Flags excessive repeated characters and a small list of common passwords.
- Gives improvement suggestions and a simple strength label.
- Generates a 16-character example using the browser cryptographic random generator.
- Runs locally in the browser. It does not send or store the entered password.

## How to run on Mac
1. Download and unzip this project.
2. Open the `password-strength-analyzer` folder.
3. Double-click `index.html` to open it in Safari or Chrome.
4. Type a sample password and test the checklist.

You can also open the folder in VS Code and use the Live Server extension.

## Important note
The score is an educational checklist, not a professional password-cracking estimate or a guarantee of security. Do not type a password that you currently use. The optional database/reuse-prevention feature is not included in this beginner version; no password history is collected.

## Technologies
- HTML5
- CSS3
- JavaScript
- Web Crypto API (`crypto.getRandomValues`)

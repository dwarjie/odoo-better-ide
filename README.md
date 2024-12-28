# Odoo-better-ide

## Overview
This project aims to enhance Odoo's in-browser code editor for Scheduled Actions by overlaying a **CodeMirror editor** with advanced features such as IntelliSense, syntax highlighting, and visual customization.

Key Features:
1. [x] **Enhanced Code Editor:** Add a modern editor with Intellisense and Autocompletion using CodeMirror 6.
2. [x] **Real-Time Syncing:** Sync code from CodeMirror to Odoo editor (in the background).
3. [x] **Customizations:** Allow theme, font size.
4. [ ] **Multi-language support:** Supports Python, XML, JavaScript, HTML, CSS (supports Python for now).
5. [ ] **Enabled by default:** Automatically embed the CodeMirror editor to the page when enabled (need to reload the browser for now).
6. [ ] **Handle Odoo Discard:** Revert code when user clicked the discard button.
6. [ ] **Vim Keybinds:** Use Vim-like keybinding.

### Technologies:
1. **CodeMirror 6:** A versatile text editor implemented in JavaScript for browsers.
2. **Chrome Extensions API:** For injecting scripts and interacting with web pages.

TODO:
- version 1:
- [x] - Implement theme
- [x] - Test with other page of Odoo
  - [x] - Server Actions
  - [x] - Scheduled Actions
  - [x] - Views
  - [x] - Form Views
  - [x] - Website editor
  - [x] - Studio App
- [ ] - Upload

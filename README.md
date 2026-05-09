<div align="center">
    <img src="images/icon-128.png" width="96" />
    <h1>Odoo Better IDE</h1>
    <p>A supercharged code editor overlay for Odoo — built on CodeMirror 6.</p>
    <div>
        <a href="https://chromewebstore.google.com/detail/odoo-better-ide/gdgcmoimojllogljdillajcgdgecfknd">
            <img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/rating/gdgcmoimojllogljdillajcgdgecfknd?style=flat-square&logo=chromewebstore&logoColor=white&label=Rating&color=%233871e1"/>
        </a>
        <a href="https://addons.mozilla.org/en-US/firefox/addon/odoo-better-ide/">
            <img alt="Mozilla Add-on" src="https://img.shields.io/amo/rating/odoo-better-ide?style=flat-square&logo=firefoxbrowser&logoColor=white&label=Rating&color=%23ed6449"/>
        </a>
    </div>
</div>

---

## What is Odoo Better IDE?

**Odoo Better IDE** replaces Odoo's built-in Ace editor with a modern [CodeMirror 6](https://codemirror.net/) editor — directly inside your browser. No external tools, no setup beyond installation.

It works on any Odoo page where you write code: Server Actions, Automation Rules, Views, Salary Rules, and more.

---

## Features

### Editor

- **CodeMirror 6** — modern, fast, and extensible editor engine
- **Syntax highlighting** for Python, XML, and QWeb
- **Find & Replace** — VS Code-style search panel
- **Real-time sync** — changes are reflected in the underlying Odoo editor instantly

### Completion & IntelliSense

- **Python completion** — global scope, local variables, and model-aware field suggestions
- **XML / QWeb completion** — element and attribute completion based on your Odoo version
- **Model field completion** — dynamically fetches fields from your current record's model
- **Version-aware schemas** — completion schemas tailored for Odoo 15, 16, 17, 18, and 19+

### Customization

- **16+ themes** — One Dark, VS Code Dark/Light, GitHub Dark/Light, Tokyo Night, Monokai, Catppuccin, Solarized, and more
- **Font family** — choose your preferred coding font
- **Font size** — adjustable via a range slider
- **Enable / disable** — toggle the extension on or off without uninstalling

### Compatibility

- Supports **Odoo 15, 16, 17, 18, 19+**
- Works on **Chromium based browsers** (Chrome, Edge, Brave, etc.) and **Firefox**
- Compatible with: Server Actions, Automation Rules, IR Views, Salary Rules, Payroll Warnings, Scheduled Actions, and more

---

## How to Use

1. Install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/odoo-better-ide/gdgcmoimojllogljdillajcgdgecfknd) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/odoo-better-ide/).
2. Open any Odoo record that contains a code editor (Server Action, View, Automation Rule, etc.).
3. The extension automatically replaces the Ace editor with CodeMirror.
4. Click the extension icon to configure your theme, font, and other preferences.

> **Tip:** For model field completion to work, make sure the model field is set and the record is saved before opening the editor.

---

## Roadmap

- [x] CodeMirror 6 editor with syntax highlighting
- [x] Real-time sync with Odoo's Ace editor
- [x] Theme and font customization
- [x] Python and XML/QWeb language support
- [x] Find & Replace
- [x] Model-aware field completion (Python & XML)
- [x] Version-aware XML schemas (Odoo 15–19+)
- [x] Firefox support
- [ ] Vim keybindings
- [ ] More XML schemas for additional view types (Calendar, Gantt, Grid)

---

## Development

```bash
# clone the repository
git clone https://github.com/dwarjie/odoo-better-ide.git
cd odoo-better-ide

# install dependencies
pnpm install

# build the extension
pnpm run build:chrome # or build:firefox
```

To load the built extension locally, follow the [Chrome unpacked extension guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) or the [Firefox temporary add-on guide](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

---

## Technologies

| Technology                                                                | Purpose                            |
| ------------------------------------------------------------------------- | ---------------------------------- |
| [CodeMirror 6](https://codemirror.net/)                                   | Editor engine                      |
| [React](https://react.dev/)                                               | Extension UI                       |
| [Vite](https://vitejs.dev/)                                               | Build tooling                      |
| [Crxjs](https://crxjs.dev/)                                               | Browser extension development tool |
| [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) | Cross-browser extension API        |

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

---

## Author's Note

This project started as a small quality-of-life improvement for writing Python and XML in Odoo's built in editor. It has since grown into a full IDE overlay supporting multiple Odoo versions, languages, and completion systems.

If you find it useful, consider leaving a review on the [Chrome Web Store](https://chromewebstore.google.com/detail/odoo-better-ide/gdgcmoimojllogljdillajcgdgecfknd) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/odoo-better-ide/) — it helps a lot. 🙏

<h1 align="center" style="border-bottom: 0px;">
    <img src="images/icon-128.png"/>
    <div>Odoo Better IDE</div>
    <div>
        <a href="https://chromewebstore.google.com/detail/odoo-better-ide/gdgcmoimojllogljdillajcgdgecfknd">
            <img src="https://img.shields.io/chrome-web-store/v/jllbemjkkabaohnjcnajhflahlkehmlf.svg?label=Chrome&color=1a73e8" alt="Chrome Web Store">
        </a>
    </div>
</h1>

### **Odoo Better IDE - Supercharge Your Odoo IDE!** 🚀

Tired of the plain Odoo code editor? Say hello to **Odoo Better IDE**, the ultimate extension designed to take your coding experience to the next level! 🎉

### **Features That Code Like Magic:**
1. ✨ **Modern Code Editor**: Experience the power of **CodeMirror 6** with IntelliSense, autocompletion, and an overall sleek interface.
2. ✨ **Real-Time Syncing**: Seamlessly sync your edits from our enhanced editor to the Odoo editor in real time—no manual hassle.
3. ✨ **Full Customization**: Make it yours! Choose from stunning themes and adjust font sizes for your perfect coding environment.
4. ✨ **Find & Replace**: Integrated VSCode like-Find & Replace.

### **Why You'll Love It:**
- ✅ Effortless setup—just install and start coding!
- ✅ Boost productivity with faster, smarter coding tools.
- ✅ Stay in control with options tailored to your style.

### **Unleash Your Coding Superpowers!**
Transform your Odoo development workflow today with **Odoo Code Booster**. Because coding doesn’t have to be boring. 🌟

### How to Use:
1. Install the Extension.
2. Select your preferred theme and font size.
3. Navigate to any Odoo Views where you can modify Python, XML, or Qweb. If Odoo-Better-IDE is enabled, the extension will automatically change the Odoo IDE.

## Author's Note
This project aims to enhance Odoo's in-browser code editor for Scheduled Actions by overlaying a **CodeMirror editor** with advanced features such as IntelliSense, syntax highlighting, and visual customization.

Key Features:
1. [x] **Enhanced Code Editor:** Add a modern editor with Intellisense and Autocompletion using CodeMirror 6.
2. [x] **Real-Time Syncing:** Sync code from CodeMirror to Odoo editor (in the background).
3. [x] **Customizations:** Allow theme, font size.
4. [x] **Multi-language support:** Supports Python, XML.
5. [x] **Enabled by default:** Automatically embed the CodeMirror editor to the page when enabled.
6. [x] **Handle Odoo Discard:** Revert code when user clicked the discard button. (thanks to [acgonzales](https://github.com/acgonzales) )
7. [ ] **Vim Keybinds:** Use Vim-like keybinding.
8. [ ] **Qweb Intellisense:** Support intellisense and code completion for Qweb.


### Technologies:
1. **CodeMirror 6:** A versatile text editor implemented in JavaScript for browsers.
2. **Chrome Extensions API:** For injecting scripts and interacting with web pages.

### Clone and Customize:
```bash
# clone the repo
git clone https://github.com/dwarjie/odoo-better-ide.git
cd odoo-better-ide

# install necessary packages
npm install

# build the extension
npm run build
```
Follow this [link](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) on how to use the built extension locally.

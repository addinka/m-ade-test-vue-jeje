# 💻 Installation Guide

Complete installation guide for Transport Shipment Tracker application.

---

## 📋 System Requirements

### Required Software

| Software | Minimum Version | Recommended | Download Link |
|----------|----------------|-------------|---------------|
| Node.js | v16.0.0 | v18.0.0+ | [nodejs.org](https://nodejs.org/) |
| npm | v7.0.0 | v9.0.0+ | Included with Node.js |
| Git | Any | Latest | [git-scm.com](https://git-scm.com/) |

### Operating System Support

✅ Windows 10/11
✅ macOS 10.15+
✅ Linux (Ubuntu 20.04+, Debian, Fedora)

### Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

---

## 🚀 Installation Steps

### Method 1: From Local Directory

If you already have the project folder:

#### Step 1: Open Terminal/Command Prompt

**Windows (PowerShell):**
```powershell
cd C:\Users\muham\OneDrive\Documents\GitHub\jeje-test
```

**Mac/Linux:**
```bash
cd ~/path/to/jeje-test
```

#### Step 2: Verify Node.js Installation

```bash
node --version
npm --version
```

Expected output:
```
v18.17.0  (or higher)
9.6.7     (or higher)
```

If not installed, download from [nodejs.org](https://nodejs.org/)

#### Step 3: Install Dependencies

```bash
npm install
```

**What this does:**
- Downloads all required packages
- Creates `node_modules` folder
- Generates `package-lock.json`

**Expected time:** 30-90 seconds

**Expected output:**
```
added 171 packages, and audited 172 packages in 25s

44 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

#### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
VITE v5.4.21  ready in 323 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### Step 5: Open in Browser

Navigate to: `http://localhost:5173/`

✅ You should see the Dashboard page with shipment data!

---

### Method 2: From Git Repository

If cloning from Git:

#### Step 1: Clone Repository

```bash
git clone <repository-url>
cd jeje-test
```

#### Step 2-5: Follow Same Steps as Method 1

(Steps 2-5 from Method 1 above)

---

## 📦 What Gets Installed

### Dependencies (Required for Production)

| Package | Version | Purpose |
|---------|---------|---------|
| vue | ^3.4.21 | Frontend framework |
| vue-router | ^4.3.0 | Routing |
| pinia | ^2.1.7 | State management |
| axios | ^1.6.7 | HTTP client |

**Total Size:** ~15 MB

### DevDependencies (Required for Development)

| Package | Version | Purpose |
|---------|---------|---------|
| @vitejs/plugin-vue | ^5.0.4 | Vite Vue plugin |
| vite | ^5.1.6 | Build tool |
| autoprefixer | ^10.4.18 | CSS prefixing |
| postcss | ^8.4.35 | CSS processing |
| tailwindcss | ^3.4.1 | CSS framework |

**Total Size:** ~150 MB

**Total node_modules Size:** ~165 MB

---

## ⚙️ Configuration Files

### Created During Installation

1. **node_modules/** - All dependencies
2. **package-lock.json** - Locked versions
3. **.vite/** - Vite cache (auto-generated)

### Pre-configured Files

1. **package.json** - Dependencies & scripts
2. **vite.config.js** - Vite configuration
3. **tailwind.config.js** - Tailwind configuration
4. **postcss.config.js** - PostCSS configuration
5. **.gitignore** - Git ignore rules

---

## 🔧 Troubleshooting

### Issue 1: "npm: command not found"

**Problem:** Node.js not installed or not in PATH

**Solution:**
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Install with default options
3. Restart terminal
4. Verify: `node --version`

### Issue 2: "EACCES: permission denied"

**Problem:** Permission issues (Mac/Linux)

**Solution:**
```bash
sudo npm install
```

Or fix npm permissions:
```bash
sudo chown -R $USER ~/.npm
```

### Issue 3: "Port 5173 is already in use"

**Problem:** Port already used by another app

**Solution 1:** Vite will auto-use next port (5174, 5175)

**Solution 2:** Kill process using port
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Issue 4: "Cannot find module 'vue'"

**Problem:** Dependencies not installed

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: "npm ERR! code ERESOLVE"

**Problem:** Dependency conflicts

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Issue 6: Installation Hangs

**Problem:** Network issues or npm cache

**Solution:**
```bash
npm cache clean --force
npm install
```

### Issue 7: "gyp ERR! stack Error: not found: python"

**Problem:** Missing Python (required by some packages)

**Solution:** Usually not critical, app will still work
Or install Python from [python.org](https://python.org)

---

## 🧹 Clean Installation

If having issues, try clean install:

### Windows (PowerShell)
```powershell
# Delete node_modules and cache
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Mac/Linux
```bash
# Delete node_modules and cache
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

---

## 🌐 Network Configuration

### Behind Corporate Proxy

Set npm proxy:
```bash
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Using Different Registry

For faster downloads in some regions:
```bash
npm config set registry https://registry.npmmirror.com
```

Reset to default:
```bash
npm config set registry https://registry.npmjs.org
```

---

## ✅ Verification Checklist

After installation, verify:

- [ ] `node_modules` folder exists
- [ ] `package-lock.json` created
- [ ] No error messages
- [ ] `npm run dev` starts server
- [ ] Browser shows dashboard at http://localhost:5173/
- [ ] No console errors in browser DevTools
- [ ] Hot reload works (edit file, auto-refresh)

---

## 📊 Disk Space Requirements

- **Source Code:** ~5 MB
- **node_modules:** ~165 MB
- **Build Output (dist):** ~500 KB (optimized)
- **Total:** ~170 MB

Make sure you have at least **200 MB** free space.

---

## 🎓 Next Steps

After successful installation:

1. Read **QUICKSTART.md** for quick tour
2. Read **README.md** for full documentation
3. Explore the application
4. Try assigning a transporter
5. Watch for real-time toast notifications

---

## 📞 Still Having Issues?

1. Check Node.js version: `node --version`
2. Check npm version: `npm --version`
3. Try clean installation (see above)
4. Check firewall/antivirus settings
5. Ensure internet connection
6. Check disk space
7. Review error messages carefully

---

## 🎉 Success!

If you see:
```
➜  Local:   http://localhost:5173/
```

**Congratulations! Installation complete!** 🎊

Open http://localhost:5173/ and start exploring!

---

**Need Help?** Check:
- README.md - Full documentation
- QUICKSTART.md - Quick start guide
- PROJECT_SUMMARY.md - Project overview

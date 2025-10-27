# HNG Stage 2 Project – TicketFlow

## 🚀 Overview

**TicketFlow** is a simple and elegant ticket management system built for the HNG Stage 2 task.  
It allows users to create, edit, and manage support tickets seamlessly in a modern Vue 3 environment.

---

## ✨ Features

- 📝 Create, view, and update support tickets
- 🎯 Set ticket priority and status
- 🧭 Responsive and clean user interface
- 🌙 Dark mode support (via Tailwind CSS theme tokens)
- 🔒 Authentication and logout functionality
- 🔔 Toast notifications using Sonner
- ⚡ Built with Vue 3 Composition API and TypeScript

---

## 🧰 Tech Stack

| Tool                                          | Purpose                       |
| --------------------------------------------- | ----------------------------- |
| [Vue 3](https://vuejs.org/)                   | Frontend framework            |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe codebase            |
| [Tailwind CSS](https://tailwindcss.com/)      | Styling and responsive design |
| [Pinia](https://pinia.vuejs.org/)             | State management              |
| [Vue Router](https://router.vuejs.org/)       | Page navigation               |
| [Sonner](https://sonner.emilkowal.ski/)       | Toast notifications           |
| [Netlify](https://www.netlify.com/)           | Deployment platform           |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd ticketflow
```

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Run the development server

```bash
pnpm dev
```

### 4️⃣ Build for production

```bash
pnpm build
```

### 5️⃣ Preview production build (optional)

```bash
pnpm preview
```

---

## 🗂 Folder Structure

```
ticketflow/
│
├── src/
│   ├── assets/          # Static assets (icons, images, etc.)
│   ├── components/      # Reusable Vue components
│   ├── lib/             # Utility functions and stores
│   ├── pages/           # Application views (e.g. CreateTicket, EditTicket)
│   ├── router/          # Vue Router setup
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│
├── public/              # Public assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🌐 Deployment (Netlify)

To deploy on **Netlify**, follow these steps:

1. Push your project to GitHub.
2. Go to [Netlify Dashboard](https://app.netlify.com/).
3. Click **“Add New Site → Import from Git”**.
4. Connect your GitHub repository.
5. Set build command to:
   ```bash
   pnpm build
   ```
6. Set publish directory to:
   ```bash
   dist
   ```
7. Click **Deploy Site** 🚀

---

## 👩🏽‍💻 Author

**Kareemah Ajimobi**  
HNG Internship (Stage 2)  
Built with ❤️ using Vue 3, TypeScript, and Tailwind CSS.

---

## 🪪 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project as permitted under the license.

# Pomodoro App

## Application Description
A modern Pomodoro timer and task manager built with React and TypeScript. The app allows users to manage tasks, track Pomodoro sessions, and view statistics, all within a clean and responsive interface. Data is persisted locally for a seamless user experience.

## Development Process & Tools

- **AI Pair Programming:** This project was developed with the assistance of [Cursor](https://www.cursor.so/) (an AI coding assistant powered by ChatGPT), which helped with code generation, refactoring, code review, and best practices throughout the development process.
- **Stitch for Design:** The initial UI/UX design and component structure were prototyped using [Stitch](https://stitch.design/), ensuring a modern and user-friendly interface.
- **React & TypeScript:** Leveraged for robust, type-safe, and maintainable code.
- **Classic CSS Modules:** Used for component-level styling, allowing for easy customization and encapsulation.
- **React Testing Library & Jest:** Used for unit testing core functionality, ensuring reliability and maintainability.
- **Prettier & ESLint:** Enforced consistent code style and quality across the codebase.
- **Git & Conventional Commits:** All changes were tracked with meaningful, conventional commit messages for clear project history.

## Setup Instructions

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at http://localhost:3000 (or your configured port).

3. **Run tests:**
   ```sh
   npm test
   ```

## Build Instructions

To create a production build:
```sh
npm run build
```
The output will be in the `build/` directory (or as configured by your build tool).

## Architecture Decisions
- **React with TypeScript:** For type safety and maintainability.
- **Component-based structure:** Each UI element (timer, task list, modals) is a separate, reusable component.
- **State management:** Local state with React hooks; tasks are persisted using `localStorage` for simplicity.
- **Styling:** Classic CSS modules for component styles, ensuring encapsulation and easy overrides.
- **Testing:** React Testing Library and Jest for unit tests.
- **Accessibility:** Modals use `react-modal` with proper app element configuration for screen readers.

## Known Limitations
- **No server-side or cloud sync:** Tasks and settings are only stored in the browser's localStorage.
- **Statistics reset:** Statistics are reset when the application is closed or localStorage is cleared.
- **No user authentication:** The app is single-user and does not support accounts or multi-device sync.
- **Limited mobile optimization:** While responsive, some UI elements may need further polish for small screens.
- **No notifications:** The app does not provide desktop or push notifications for session changes.

---
MIT License

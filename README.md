# Markdown Editor with Autocomplete

This is a simple markdown editor built with [CodeMirror](https://codemirror.net/) that supports live preview, markdown syntax highlighting, and autocompletion for common markdown elements.

## Features

- **Live Markdown Preview**: See the rendered HTML output as you type.
- **Markdown Syntax Highlighting**: Get syntax highlighting for common markdown elements like headers, bold, italic, etc.
- **Autocompletion**: Autocomplete markdown syntax such as headers (`#`), bold (`**`), italic (`*`), and links (`[]`).
- **Responsive Layout**: The editor and preview pane are laid out side by side, with a responsive design for different screen sizes.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **CodeMirror**: A versatile text editor for the browser, which is used to handle the markdown editing functionality.
- **Marked**: A markdown parser to convert markdown into HTML.
- **Vite**: A fast build tool for modern web applications.

## Installation

To get started with this project locally, clone this repository and run the following commands:

1. Clone the repository:

   git clone https://github.com/BryanH-81/markdown-editor.git
   cd markdown-editor
   
Install the dependencies:
npm install

Dependencies
To run this project locally, you'll need the following dependencies:

React

react: ^18.0.0

react-dom: ^18.0.0

Vite

vite: ^5.0.0

CodeMirror

@codemirror/view: ^6.0.0

@codemirror/lang-markdown: ^6.0.0

@codemirror/state: ^6.0.0

@codemirror/commands: ^6.0.0

@codemirror/autocomplete: ^6.0.0

Marked

marked: ^4.0.0

Dev Dependencies
Vite Plugin for React

@vitejs/plugin-react: ^2.0.0

TypeScript

typescript: ^4.0.0

ESLint

eslint: ^8.0.0

eslint-plugin-react: ^7.0.0

Prettier

prettier: ^2.0.0

Start the development server:
npm run dev

Visit http://localhost:5173/ in your browser to see the markdown editor in action.

Usage
Markdown Syntax Autocompletion: As you type markdown syntax (e.g., #, **, *), the editor will show suggestions for valid completions.

Preview: On the right panel, you will see the rendered markdown output.

Editing: You can type freely in the editor pane, and the preview will update in real-time.


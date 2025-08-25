# CodeTribe - Real-time Collaborative Code Editor

A professional, minimalistic real-time collaborative code editor designed for office meetings, student projects, and team development sessions.

## Features

### Core Functionality
- **Multi-language Support**: JavaScript, TypeScript, Python, HTML, CSS, JSON, Markdown, SQL, Java, C++, C, C#, Go, Rust, PHP, Ruby
- **Real-time Collaboration**: Synchronized code editing with live cursor tracking
- **Live Preview**: Instant preview for HTML/CSS/JavaScript with iframe rendering
- **Integrated Chat**: Team communication sidebar for discussions
- **Session Management**: Create or join sessions with unique room IDs
- **Code Execution**: Simulated cloud-based code execution for supported languages
- **Version Control**: Basic commit functionality with change tracking
- **Error Detection**: Built-in Monaco Editor linting and syntax highlighting

### User Experience
- Clean, professional interface optimized for productivity
- Responsive design for desktop development workflows
- Auto-completion and IntelliSense support
- User presence indicators with color-coded cursors
- Real-time execution results sharing

## Tech Stack

- **Frontend**: Next.js 13 with React 18
- **Code Editor**: Monaco Editor (VS Code's editor)
- **UI Components**: Radix UI with Tailwind CSS
- **Icons**: Lucide React
- **Real-time Features**: Simulated collaboration service
- **Build Tool**: Next.js with static export

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codetribe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized static build in the `out` directory.

## Usage

### Creating a Session
1. Enter your username on the home page
2. Click "Create New Session" to generate a unique session ID
3. Share the session ID with team members

### Joining a Session
1. Enter your username on the home page
2. Input the session ID provided by the session creator
3. Click "Join Existing Session"

### Editor Features
- **Language Selection**: Use the dropdown in the left panel to change programming languages
- **Live Preview**: HTML/JavaScript code automatically renders in the right panel
- **Code Execution**: Click the "Run" button to execute code and see results
- **Chat**: Use the chat panel for team communication
- **Save/Commit**: Save your work locally or commit changes to version history

## Project Structure

```
├── app/
│   ├── editor/[sessionId]/     # Dynamic editor pages
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── ChatPanel.tsx           # Team chat functionality
│   ├── CodeEditor.tsx          # Monaco Editor wrapper
│   ├── ControlPanel.tsx        # Language and execution controls
│   ├── PreviewPanel.tsx        # Live code preview
│   └── UserPanel.tsx           # Active users display
├── lib/
│   ├── collaboration.ts        # Real-time sync simulation
│   ├── codeExecution.ts        # Code execution service
│   └── utils.ts                # Utility functions
└── README.md
```

## Configuration

### Monaco Editor
The editor is configured with:
- Syntax highlighting for 15+ languages
- Auto-completion and IntelliSense
- Error detection and linting
- Minimap and line numbers
- Responsive layout

### Supported Languages
- JavaScript/TypeScript
- Python
- HTML/CSS
- Java, C++, C, C#
- Go, Rust, PHP, Ruby
- JSON, Markdown, SQL

## Development

### Adding New Languages
1. Add the language to `SUPPORTED_LANGUAGES` in `components/ControlPanel.tsx`
2. Update the execution logic in `lib/codeExecution.ts` if needed
3. Test syntax highlighting and auto-completion

### Extending Real-time Features
The current implementation uses simulated collaboration. To add real backend:
1. Replace `lib/collaboration.ts` with Socket.io client
2. Set up Node.js server with Socket.io
3. Implement MongoDB for session persistence

### Customizing UI
- Modify Tailwind classes in components for styling
- Update `app/globals.css` for global theme changes
- Extend `components/ui/` for new UI components

## Deployment

### Static Deployment (Recommended)
The app is configured for static export and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Full-Stack Deployment
For real-time features, deploy:
- Frontend: Vercel/Netlify
- Backend: Heroku/Railway/DigitalOcean
- Database: MongoDB Atlas

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review the code structure for implementation details

---

**CodeTribe** - Empowering collaborative coding experiences
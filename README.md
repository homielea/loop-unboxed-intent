# Loop Closing

> Close your open loops. Fast. Deliberate. No fluff.

## What is Loop Closing?

Loop Closing is a brutalist productivity tool designed to help you capture, confront, and close your mental "open loops" - those unfinished tasks, ideas, and promises that drain your mental bandwidth.

**Philosophy:**
- No gamification
- No streaks
- No artificial dopamine hits
- Just you, your commitments, and the satisfaction of finishing what you started

## Features

- **Fast Capture**: Brain dump everything with a simple, keyboard-first interface
- **Deliberate Review**: See all your open loops in one place - no hiding
- **Intentional Closure**: Mark tasks complete and feel the weight lift
- **Offline-First**: All data stored locally in your browser
- **Keyboard Shortcuts**: Navigate entirely with your keyboard
- **Brutalist Design**: Intentionally raw, asymmetric, anti-polish aesthetic

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `?` | Show/hide keyboard shortcuts |
| `N` or `Enter` | Focus input to add new loop |
| `Escape` | Close dialogs or clear input |
| `Space` | Toggle loop completion (when focused) |
| `Delete` | Delete loop (when focused) |

## Tech Stack

- **React** + **TypeScript** - Type-safe component architecture
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Brutalist design system with semantic tokens
- **Shadcn/UI** - Customized, accessible component primitives
- **Lucide React** - Clean, minimal icons
- **LocalStorage** - Offline-first data persistence

## Design System

The app uses a brutalist/retro design language:

- **Fonts**: Space Mono (monospace)
- **Colors**: Black, white, yellow accents, red for emphasis
- **Layout**: Asymmetric, left-aligned, visible grid overlay
- **Borders**: 4px hard borders, no rounded corners
- **Shadows**: Hard drop shadows for depth
- **Typography**: Heavy, uppercase, tracking-wide

All styles are semantic tokens defined in `src/index.css` and `tailwind.config.ts` - never ad-hoc classes in components.

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   └── brutalist-button.tsx    # Custom button component
│   ├── App.tsx                      # Main app container
│   ├── GridOverlay.tsx              # Brutalist grid background
│   ├── Landing.tsx                  # Landing page with manifesto
│   ├── LoopInput.tsx                # Input field for new loops
│   ├── LoopItem.tsx                 # Single loop item
│   ├── LoopList.tsx                 # List of loops (open/closed)
│   └── ShortcutsHelp.tsx            # Keyboard shortcuts modal
├── hooks/
│   └── useLoops.ts                  # Loop state management + localStorage
├── types/
│   └── loop.ts                      # Loop TypeScript interface
├── pages/
│   └── Index.tsx                    # Entry page
└── index.css                        # Design system tokens
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd loop-closing

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build for Production

```bash
npm run build
```

## Accessibility

Loop Closing is built with accessibility in mind:

- ✅ All interactive elements are keyboard-reachable
- ✅ ARIA labels for icon buttons
- ✅ 4.5:1 contrast ratio maintained
- ✅ Focus indicators on all interactive elements
- ✅ Semantic HTML structure
- ✅ Help panel accessible with `?` key

## Testing

To run tests:

```bash
npm test
```

Test coverage includes:
- Loop storage logic (add, toggle, delete)
- Component rendering
- Keyboard shortcuts
- LocalStorage persistence

## Contributing

This is a minimal MVP. If you'd like to extend it:

1. Keep the brutalist aesthetic
2. Maintain keyboard-first UX
3. No feature bloat - less is more
4. Write tests for new functionality

## License

MIT

---

**Built with Lovable** - [lovable.dev](https://lovable.dev)

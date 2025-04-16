import { useEffect, useRef, useState } from 'react';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  placeholder
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { marked } from 'marked';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';  // Import autocomplete extensions
import './App.css';

const STORAGE_KEY = 'markdown-editor-cm';

// Markdown autocomplete items
const markdownSuggestions = [
  { label: '#', type: 'keyword' },   // Header
  { label: '**', type: 'keyword' },  // Bold
  { label: '*', type: 'keyword' },   // Italic
  { label: '[', type: 'keyword' },   // Link opening
  { label: ']', type: 'keyword' },   // Link closing
  { label: '!', type: 'keyword' },   // Image tag opening
];

export default function App() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [previewHTML, setPreviewHTML] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || '# Hello, Markdown!';
    const startDoc = saved;

    const updatePreview = (doc: string) => {
      const parsedHTML = marked.parse(doc);
      setPreviewHTML(parsedHTML); // Trigger re-render for the preview
      localStorage.setItem(STORAGE_KEY, doc); // Save updated content
    };

    const state = EditorState.create({
      doc: startDoc,
      extensions: [
        lineNumbers(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown(),
        autocompletion({
          override: [completeFromList(markdownSuggestions)], // Add markdown suggestions
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const doc = update.state.doc.toString();
            updatePreview(doc); // Update preview after document change
          }
        }),
        EditorView.lineWrapping,
        highlightActiveLine(),
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current!,
    });

    updatePreview(startDoc); // Ensure the preview is updated on initial load

    return () => {
      viewRef.current?.destroy();
    };
  }, []);

  return (
    <div className="container">
      <div className="editor-pane" ref={editorRef}></div>
      {/* Rendering HTML content from markdown */}
      <div className="preview-pane" dangerouslySetInnerHTML={{ __html: previewHTML }} />
    </div>
  );
}

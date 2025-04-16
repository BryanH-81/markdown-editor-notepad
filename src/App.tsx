import { useEffect, useRef, useState } from 'react';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { marked } from 'marked';
import './App.css';

const STORAGE_KEY = 'markdown-editor-cm';

export default function App() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [previewHTML, setPreviewHTML] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || '# Hello, Markdown!';
    const startDoc = saved;

    const updatePreview = (doc: string) => {
      setPreviewHTML(marked.parse(doc));
      localStorage.setItem(STORAGE_KEY, doc);
    };

    const state = EditorState.create({
      doc: startDoc,
      extensions: [
        lineNumbers(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown(),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            const doc = update.state.doc.toString();
            updatePreview(doc);
          }
        }),
        EditorView.lineWrapping,
        highlightActiveLine()
      ]
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current!,
    });

    updatePreview(startDoc);

    return () => {
      viewRef.current?.destroy();
    };
  }, []);

  return (
    <div className="container">
      <div className="editor-pane" ref={editorRef}></div>
      <div
        className="preview-pane"
        dangerouslySetInnerHTML={{ __html: previewHTML }}
      />
    </div>
  );
}

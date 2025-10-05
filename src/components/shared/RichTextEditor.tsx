"use client"

import { Button } from "@/components/ui/button"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Image as ImageIcon, Italic, Link as LinkIcon, Underline as UnderlineIcon } from "lucide-react"
import { useEffect } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
    ],
    content: value,
     immediatelyRender: false, // 👈 this avoids hydration issues
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Keep external form state synced with editor content
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false })
    }
  }, [value,editor])

  if (!editor) return null

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="flex gap-1 border-b p-2">
        <Button
          size="sm"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("underline") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            const url = prompt("Enter URL")
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            const url = prompt("Enter image URL")
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose prose-sm p-3 min-h-[200px]" />
    </div>
  )
}

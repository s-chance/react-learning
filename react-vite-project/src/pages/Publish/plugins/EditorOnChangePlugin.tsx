import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type onChangeType = (content: string) => void;

interface NodeType extends SerializedLexicalNode {
  children?: [{ text: string }];
}

const EditorOnChangePlugin = ({ onChange }: { onChange: onChangeType }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const editorStateJSON: SerializedEditorState<NodeType> =
        editorState.toJSON();
      const content =
        editorStateJSON.root.children?.[0].children?.[0]?.text ?? "";
      onChange(content);
    });
  }, [editor, onChange]);
  return null;
};

export default EditorOnChangePlugin;

import { css } from '@emotion/react';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

export const Header = () => {
  const onError = () => {};

  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    onError,
    editable: true,
  };

  return (
    <div css={header}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin contentEditable={<ContentEditable css={input} />} placeholder={<></>} ErrorBoundary={LexicalErrorBoundary} />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
};

const header = css`
  height: 10%;
  padding: 0 20px;
  background: #fff;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const input = css`
  height: 50%;
  width: 90%;
  padding: 0 20px;
  border-radius: 100px;
  border: 1.5px solid #dddddd;
  &:focus {
    outline: none;
    border: 1.5px solid #999999;
  }
  color: #333333;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

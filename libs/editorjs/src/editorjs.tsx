import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
import { ButtonHTMLAttributes, useEffect, useMemo, useState } from 'react';
import styled, { CreateStyledComponent } from '@emotion/styled';

import {
  EditorJSHeader,
  EditorJSList,
  EditorJSQuote,
  EditorJSUndeline,
  EditorJSTable,
  EditorJSImage,
  EditorJSMarker,
  EditorJSEmbed,
  EditorJSWarning,
  // EditorJSInlineStyle,
  EditorJSAlignment,
  EditorJSParagraph,
  EditorJSUndo,
  EditorJSDelimeter,
  EditorJSTextTune,
} from './components';

const Styled = {
  Container: styled.div``,
  Editor: styled.div``,
  Button: styled.button``,
};

export interface EditorTSProps {
  options?: {
    placeholder?: string;
    data?: OutputData;
    image?: {
      field?: string;
      endpoints: {
        byFile?: string;
        byUrl?: string;
      };
    };
  };
  onSave: (data: OutputData) => void;
}

export const EditorTS: React.FC<EditorTSProps> = ({ options, onSave }) => {
  const [instance, setInstance] = useState<EditorJS | null>(null);

  const config: EditorConfig = useMemo(
    () => ({
      minHeight: 400,

      holder: 'kairo-editorjs',
      autofocus: false,
      placeholder: options?.placeholder || 'Start writing your idea...',
      tools: {
        underline: EditorJSUndeline,
        warning: EditorJSWarning,
        delimiter: EditorJSDelimeter,
        textTune: EditorJSTextTune,
        alignmentTune: {
          class: EditorJSAlignment,
          config: {
            default: 'left',
          },
        },
        Marker: {
          class: EditorJSMarker,
          shortcut: 'CMD+SHIFT+M',
        },
        header: {
          class: EditorJSHeader,
          inlineToolbar: true,
          config: {
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3,
          },
          tunes: ['alignmentTune'],
        },
        paragraph: {
          class: EditorJSParagraph,
          inlineToolbar: true,
          tunes: ['alignmentTune', 'textTune'],
        },
        list: {
          class: EditorJSList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
        quote: {
          class: EditorJSQuote,
          inlineToolbar: true,
        },
        table: {
          class: EditorJSTable,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        image: {
          class: EditorJSImage,
          config: {
            field: options?.image?.field || 'file',
            endpoints: {
              byFile: options?.image?.endpoints.byFile || '',
            },
          },
        },
        embed: {
          class: EditorJSEmbed,
          inlineToolbar: true,
          config: {
            services: {
              youtube: true,
              instagram: true,
            },
          },
        },
      },
    }),
    [options]
  );

  useEffect(() => {
    const editorjs = new EditorJS(config);

    editorjs.isReady.then(() => {
      const undo = new EditorJSUndo({ editor: editorjs });

      if (options?.data) {
        undo.initialize(options.data);
        editorjs.render(options.data);
      }
    });

    setInstance(editorjs);
  }, [config, options?.data]);

  return (
    <Styled.Container>
      <Styled.Editor id="kairo-editorjs">
        <div>
          <Styled.Button
            onClick={() => {
              instance?.save().then((data) => onSave(data));
            }}
          >
            Save
          </Styled.Button>
        </div>
      </Styled.Editor>
    </Styled.Container>
  );
};

export default EditorTS;

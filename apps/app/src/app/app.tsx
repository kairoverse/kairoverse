import styled from '@emotion/styled';
import { EditorTS } from '@kairoverse/editorjs';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <EditorTS onSave={(data) => {
        console.log(data)
      }}/>
    </StyledApp>
  );
}

export default App;

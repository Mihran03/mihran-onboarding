import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor
import { Button} from '@mui/material';

function TextEditor({ handleFileChange, editorContent, handleEditorChange, handleDownload }) {
  return (
    <div className='texteditor'>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <ReactQuill theme="snow" value={editorContent} onChange={handleEditorChange} />
      <Button style={{ color: 'rgba(66, 62, 62)' , borderColor: 'rgba(66, 62, 62)'  }} variant= 'outlined'onClick={handleDownload}>Download Edited File</Button>
    </div>
  );
}

export default TextEditor;

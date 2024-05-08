// TextEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor

function TextEditor({ handleFileChange, editorContent, handleEditorChange, handleDownload }) {
  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <ReactQuill theme="snow" value={editorContent} onChange={handleEditorChange} />
      <button onClick={handleDownload}>Download Edited File</button>
    </div>
  );
}

export default TextEditor; // Ensure you have this line

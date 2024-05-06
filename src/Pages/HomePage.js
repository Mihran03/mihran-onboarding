import React, { useState } from 'react';
import TextEditor from './TextEditor';
import DraggableBox from './DraggableBox';
import '../css/homepage.css';


import Button from '@material-ui/core/Button';
import ListIcon from '@mui/icons-material/List';


function HomePage() {
  const [editorContent, setEditorContent] = useState('');

  const [showDraggable, setShowDraggable] = useState(false);

  const toggleDraggable = () => setShowDraggable(!showDraggable);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setEditorContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleEditorChange = content => {
    setEditorContent(content);
  };

  const handleDownload = () => {
    // Function to remove HTML tags
    const textContent = editorContent.replace(/<[^>]*>?/gm, '');

    const element = document.createElement("a");
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "editedFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="homepage">
    <h1>Welcome to the StudySync!</h1>
    <Button variant="contained" onClick={toggleDraggable} endIcon={<ListIcon />}>
    {showDraggable ? 'Hide To-Do List' : 'Show To-Do List'}
</Button>
    
    <DraggableBox isVisible={showDraggable} />
    <div className="text-editor-container">
      <TextEditor 
        handleFileChange={handleFileChange}
        editorContent={editorContent}
        handleEditorChange={handleEditorChange}
        handleDownload={handleDownload}
      />
    </div>
  </div>
  );
}

export default HomePage;

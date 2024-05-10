import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeObserver } from '@wojtekmaj/react-hooks';

// Using CDN for workerSrc to avoid path issues
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

const resizeObserverOptions = {};
const maxWidth = 800;

function PdfEditor() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState(null);

    const onResize = useCallback((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    const onFileLoad = (event) => {
        const files = event.target.files;
        if (files && files[0]) {
            setSelectedFile(files[0]);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div style={{ marginTop: '50px' }}> {/* Adjust the top margin as needed */}
            <input type="file" accept=".pdf" onChange={onFileLoad} />

            {selectedFile && (
                <div ref={setContainerRef}>
                    <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                            />
                        ))}
                    </Document>
                </div>
            )}

            {selectedFile && (
                <p>Page 1 of {numPages}</p>
            )}
        </div>
    );
}

export default PdfEditor;

import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import Markdown from 'react-markdown';

function AI() {
  const [prompt, setPrompt] = useState('')
  const fileRef = useRef(null)
  const formData = new FormData();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [output, setOutput] = useState('');

  const logout = () => {
    sessionStorage.removeItem('is_logged_in');
    window.location.reload();
  }

  const getDocuments = async () => {
    const user_id = sessionStorage.getItem('user_id');
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rag/get-document`, {
      params: {
        user_id: user_id
      }
    });
    setDocuments(response.data.data);
  }

  useEffect(() => {
    getDocuments();
  }, []);

  const UploadFunction = async () => {
    formData.append('file', fileRef.current.files[0]);
    formData.append('user_id', sessionStorage.getItem('user_id'));
    const uploadResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rag/upload-pdf`, {
      method: 'POST',
      body: formData
    });

    getDocuments();
  }

  const handleSubmit = async () => {
    if (!selectedDocument) {
      setOutput("Please select a document to ask your prompt.");
      return;
    }
    else{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rag/ask`, {
          document_id: selectedDocument.id,
          prompt: prompt
      });
      setOutput(response.data.data);
    }
  }

  return (
    <div className="nb-page">
      <header className="nb-header">
        <h1 className="nb-title">RAG</h1>
        <span className="nb-tag">Ask your PDF</span>
        <button className="nb-btn nb-logout" onClick={logout} type="button">Logout</button>
      </header>

      <div className="nb-card">
        <form className="nb-form">
          <div>
            <label className="nb-label" htmlFor="nb-prompt">Prompt</label>
            <div className="nb-row">
              <input
                id="nb-prompt"
                className="nb-input"
                type="text"
                placeholder="Enter your prompt"
                value={prompt}
                onChange={(e) => {setPrompt(e.target.value)}}
              />
              <button className={`nb-btn nb-btn-primary ${selectedDocument ? '' : 'disabled-btn'}`} onClick={handleSubmit} type="button">Submit</button>
            </div>
          </div>

          <div>
            <label className="nb-label" htmlFor="nb-file">PDF Document</label>
            <div className="nb-row">
              <input id="nb-file" className="nb-file" type="file" accept="application/pdf" ref={fileRef} />
              <button className="nb-btn nb-btn-secondary" type="button" onClick={UploadFunction}>Upload</button>
            </div>
          </div>

        </form>
      </div>

      <section className="nb-output">
        <div className="nb-output-head">Documents</div>
        <div className="nb-documents-container">
          {documents.length === 0 ? "Upload a Document to get started." : 
            documents.map((document) => (
              <div key={document.id} className={selectedDocument?.id === document.id ? "nb-document nb-document-selected" : "nb-document"}>
                <input type="radio" name="document" onChange={() => setSelectedDocument(document)} className="nb-document-checkbox" />
                <div className="nb-document-name">
                  {document.name.length > 20 ? (document.name.substring(0, 31) + "...") : document.name }
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <section className="nb-output">
        <div className="nb-output-head">Output</div>
        {output ? <div className="nb-output-content"><Markdown>{output}</Markdown></div> : <div className="nb-empty">{output || "Upload/Select a Document to get relevant answers."}</div>}
      </section>
    </div>
  )
}

export default AI
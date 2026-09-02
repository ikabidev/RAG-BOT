import { useState, useRef } from 'react'
import Markdown from 'react-markdown';

function AI() {
  const [prompt, setPrompt] = useState('')
  const fileRef = useRef(null)
  const formData = new FormData();

  const logout = () => {
    sessionStorage.removeItem('is_logged_in');
    window.location.reload();
  }

  const UploadFunction = async () => {
    formData.append('file', fileRef.current.files[0]);
    formData.append('user_id', sessionStorage.getItem('user_id'));
    const uploadResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rag/upload-pdf`, {
      method: 'POST',
      body: formData
    });

    window.alert("File Uploaded Successfully");
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
              <button className="nb-btn nb-btn-primary" type="button">Submit</button>
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

      <div>
        
      </div>

      <section className="nb-output">
        <div className="nb-output-head">Output</div>
        <div className="nb-empty">{"Upload a Document to get relevant answers."}</div>
      </section>
    </div>
  )
}

export default AI
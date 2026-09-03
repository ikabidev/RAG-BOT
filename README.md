# RAG-BOT v1

A learning project to understand and build a **Retrieval-Augmented Generation (RAG)** application from scratch using **React**, **NestJS**, and **Gemini**.

This README serves as a progress tracker, documenting the concepts learned and features implemented throughout the project.
 
---

## Progress Timeline

- ✅ **Aug 3** — Set up the React app with a basic PDF upload workflow and a simple Gemini question-answer pipeline.
- ✅ **Aug 4** — Learned the end-to-end RAG architecture: document retrieval, PDF text extraction, chunking strategies, and text embeddings.
- ✅ **Aug 9** — Implemented page-wise PDF text extraction using **PDF.js**.
- ✅ **Aug 10** — Implemented chunking of the extracted text and understood chunk overlap; applied a NeoBrutalism design pattern to the UI.
- ✅ **Aug 17** — Generated embeddings for each chunk using Gemini's `gemini-embedding-001` model, with the `RETRIEVAL_DOCUMENT` task type.
- ✅ **Aug 21** — Completed the retrieval loop: embedded the user's prompt with the `RETRIEVAL_QUERY` task type, ranked chunks by **cosine similarity**, and passed the top 3 as context to `gemini-2.5-flash` for a grounded answer.
- ✅ **Aug 28** — Adding a NestJS backend and understanding NestJS architecture, Create DB in supabase, Added login
- ✅ **Aug 31** — Connected the React login/register form to the NestJS `/auth` endpoints with **axios**, and added DTOs for the request bodies.
- ✅ **Sep 2** — Ported the RAG pipeline into the **NestJS** backend: `POST /rag/upload-pdf` accepts the file as multipart upload and runs extraction → chunking → embedding server-side, with each stage refactored into its own helper under `Common/Utils`.
- ✅ **Sep 3** — List a user's uploaded documents, and rendered them as a selectable list.
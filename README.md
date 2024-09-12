# Chat-GPT Clone

This project is a side project where I've developed a ChatGPT clone using gagdet.dev that integrates with [OpenAI's completions API](https://platform.openai.com/docs/api-reference/completions), allowing signed-in users to interact with the model.

[Link to project](https://aa-gpt-clone--development.gadget.app/chat-gpt)

## Table of Contents

- [App Overview](#app-overview)
  - [Connections](#connections)
  - [Data Modeling + Template Overview](#data-modeling--template-overview)
    - [Template Default Models](#template-default-models)
  - [Backend (Actions + Code)](#backend-actions--code)
  - [Access Roles + API Permissions](#access-roles--api-permissions)
  - [Frontend](#frontend)

## App Overview

### Connections

The app utilizes the OpenAI connection and is currently using Gadget-provided OpenAI credentials.

### Data Modeling + Template Overview

- **`chat`**
  - Captures a series of messages between a `user` and ChatGPT (relationship: `chat` belongs to `user`)
  - Includes `name`, which is an OpenAI-generated summary of the first message sent by the `user`
  - Each `chat` record consists of multiple messages (relationship: `chat` has many `message`)
  
- **`message`**
  - Stores individual messages that form a `chat` (relationship: `message` belongs to `chat`)
  - Contains `content`, `order` (to manage message order in a chat), and `role` (system, user, or assistant)

#### Template Default Models

- **`user`**
  - Tracks all users who have signed up
  - A `user` can have multiple `chat` records (relationship: `user` has many `chat`)

- **`session`**
  - Tracks user sessions

### Backend (Actions + Code)

- **`chat/create.js`**
  - Custom code has been added to pull the user ID from the session if no `user` is present on the incoming record
- **`chat/name.js`**
  - A custom action added to send a prompt to OpenAI and generate a name for the chat
- **`routes/POST-chat.js`**
  - Sends chat messages to OpenAI and streams the response back to the frontend using Gadget's `openAIResponseStream` tool

### Access Roles + API Permissions

- **Unauthenticated Users**
  - No access is granted to unauthenticated users
- **Signed-in Users**
  - Can read and create `message` records, with access restrictions based on tenancy filters
  - Full access to the `chat` model, with restrictions on actions other than `create`

### Frontend

The [Chakra UI](https://chakra-ui.com/) component library has been installed for building the frontend. The [`nanoid` package](https://github.com/ai/nanoid) is used to generate unique message IDs.

The frontend uses a `useChat` hook to communicate with the backend. Frontend state is managed using a [React context](https://react.dev/learn/passing-data-deeply-with-context) and a [React reducer](https://react.dev/learn/scaling-up-with-reducer-and-context).


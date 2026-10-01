# 🔫 GEARZ Payload Smith

GEARZ Payload Smith is a local AI-assisted payload-drafting interface for authorized security testing and lab exercises. Describe a vulnerability, choose Beginner or Advanced mode, and review the text returned by an Ollama model.

Built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## What it does

- Sends a vulnerability description and selected mode to a local Ollama chat endpoint
- Requests three to five candidate payloads and displays the response as a list
- Downloads the displayed text as `payloadsmith-output.txt`
- Provides a compact, terminal-inspired interface

The application generates text only. It does not send payloads to a target, verify that they work, or establish permission to test. Model output can be incorrect and must be reviewed before use.

## Requirements

- Node.js and npm compatible with the locked Next.js 15.4.4 release
- [Ollama](https://docs.ollama.com/quickstart) running on the same machine as the Next.js server
- The `llama3` model available in Ollama

The current client is hard-coded to `http://localhost:11434/v1/chat/completions`. It uses Ollama's OpenAI-compatible API format; hosted OpenAI support and an API-key configuration are not implemented.

## Local setup

Clone the repository and install the locked dependencies:

```bash
git clone https://github.com/Gearsoldier/gearz-payload-smith.git
cd gearz-payload-smith
npm ci
```

Install Ollama using its official instructions, start its local service, and download the model:

```bash
ollama pull llama3
```

If the Ollama service is not already running, start `ollama serve` in a separate terminal. Then start the web app, bound to the local machine:

```bash
npm run dev -- --hostname 127.0.0.1
```

Open [http://localhost:3000](http://localhost:3000). Describe an authorized lab scenario, choose a mode, and select **Generate Payloads**. Use **Save to file** to download the result.

Model inference is local with this configuration. Initial package and model downloads require network access.

## Project structure

- [`components/PayloadForm.tsx`](components/PayloadForm.tsx): prompt input, mode toggle, results, and download
- [`app/api/generate-payload/route.ts`](app/api/generate-payload/route.ts): prompt construction and response parsing
- [`lib/ai.ts`](lib/ai.ts): local Ollama HTTP client
- [`app/page.tsx`](app/page.tsx): application page
- [`package.json`](package.json): dependencies and scripts

## Development commands

- `npm run dev`: start the Next.js development server
- `npm run build`: create a production build
- `npm run start -- --hostname 127.0.0.1`: serve an existing build locally
- `npm run lint`: invoke the declared `next lint` script; the repository does not include an ESLint configuration or ESLint dependency

There is no automated test script or test suite in the repository. The commands above describe the available scripts, not a guarantee that the current build passes.

## Current limitations

- Model selection and endpoint configuration require source changes
- Beginner/Advanced mode changes the model prompt; it is not a validated difficulty or safety control
- Output is split on newlines without structured validation
- Request validation, provider-error handling, authentication, and rate limiting are minimal or absent
- Keep the app local and trusted-only; review its API and dependencies before exposing it to other users

## Responsible use

Use this project only for systems you own or are explicitly authorized to test. Keep credentials and private target data out of prompts and exported files. Review all generated content before applying it in an approved test environment.

<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because React 19 builds the responsive SPA (note list, editor with debounced auto-save, live search) and stores the opaque session token to send as a Bearer header. Built with Vite and reads VITE_API_BASE_URL at runtime.

## Consequences

A SPA needs client-side routing and token handling, but gives the instant, app-like feel the product requires on desktop and mobile.
<!-- sdlc:auto:end adr -->
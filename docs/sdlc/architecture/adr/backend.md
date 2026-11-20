<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Django REST Framework

## Decision Outcome

Chosen option: FastAPI 0.115, because FastAPI 0.115 serves the small set of auth and note endpoints with little code, validates request bodies with Pydantic, and enforces per-user ownership and session validation on every call.

## Consequences

Lean and fast to run cheaply at modest scale; team must add a few libraries (password hashing) that a heavier framework might bundle.
<!-- sdlc:auto:end adr -->
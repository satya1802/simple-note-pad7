<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because PostgreSQL 16 stores accounts, notes, sessions and reset tokens durably, and its built-in full-text search (tsvector + GIN index) powers the keyword search without a separate search product.

## Consequences

Full-text search is simpler and cheaper than an external engine here; it is adequate for thousands of users though less feature-rich than a dedicated search service, which is not needed at this scale.
<!-- sdlc:auto:end adr -->
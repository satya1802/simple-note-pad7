# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run. **Tests** counts the tests written for the story, and **Result** how many last passed, how many failed and when, as of this page's generation; the Documentation tab shows them live.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Test step | Tests | Result | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Sign up with email and password | US-001, US-001-T1, US-001-T2, US-001-T3, US-001-T4 | 1 | POST /auth/signup, backend, database, frontend, sessions, users | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Log in to an existing account | US-002 | 1 | POST /auth/login, backend, frontend, sessions, users | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Log out and session expiry | US-003 | 1 | POST /auth/logout, backend, frontend, sessions | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-002 | Create a note | US-004 | 2 | POST /notes, backend, database, frontend, notes | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-005 | EPIC-002 | Automatic save of note changes | US-005 | 3 | PUT /notes/{id}, backend, frontend, notes | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-002 | View a note | US-006 | 2 | GET /notes/{id}, backend, frontend, notes | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-002 | Edit a note | US-007 | 3 | PUT /notes/{id}, backend, frontend, notes | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-002 | Delete a note | US-008 | 2 | DELETE /notes/{id}, backend, frontend, notes | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-003 | View the note list | US-009 | 2 | GET /notes, backend, frontend, notes | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-003 | Search notes by keyword | US-010 | 3 | GET /notes/search, backend, database, frontend, notes | — | — | not started | not run | 0 | No tests | 0/3 tested · 0/3 passing | — |
| US-011 | EPIC-004 | Keep notes private per user | US-011 | 2 | GET /notes, GET /notes/search, GET /notes/{id}, backend, notes, users | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-004 | Delete my account | US-012 | 3 | DELETE /account, backend, frontend, notes, sessions, users | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
| US-013 | EPIC-004 | Use the app free on desktop and mobile browsers | US-013 | 4 | frontend | — | — | not started | not run | 0 | No tests | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->

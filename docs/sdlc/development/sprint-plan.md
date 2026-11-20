# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up accounts: sign-up, login, logout and session expiry

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Sign up with email and password | 8 | backend-agent | — |
| ↳ US-001-T1 | Task | Add users table migration and password hashing utility | — | backend-agent | — |
| ↳ US-001-T2 | Task | Implement POST /auth/signup endpoint | — | backend-agent | — |
| ↳ US-001-T3 | Task | Build signup form UI | — | frontend-agent | — |
| ↳ US-001-T4 | Task | Add signup endpoint test suite | — | qa-agent | — |
| US-002 | Story | Log in to an existing account | 5 | backend-agent | US-001 |
| US-003 | Story | Log out and session expiry | 5 | backend-agent | US-002 |

## Sprint 2: Sprint 2

Core note CRUD, note list, and per-user privacy enforcement

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Create a note | 5 | backend-agent | US-002 |
| US-006 | Story | View a note | 3 | frontend-agent | US-004 |
| US-008 | Story | Delete a note | 3 | backend-agent | US-004 |
| US-009 | Story | View the note list | 5 | frontend-agent | US-004 |
| US-011 | Story | Keep notes private per user | 3 | qa-agent | US-004, US-006, US-009 |

## Sprint 3: Sprint 3

Note editing, auto-save, search, and account deletion

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Automatic save of note changes | 5 | frontend-agent | US-007 |
| US-007 | Story | Edit a note | 5 | backend-agent | US-004, US-006 |
| US-010 | Story | Search notes by keyword | 5 | backend-agent | US-009 |
| US-012 | Story | Delete my account | 5 | backend-agent | US-001, US-003, US-008 |

## Sprint 4: Sprint 4

Responsive layout polish across the app

Capacity: 20 points · Committed: 5

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-013 | Story | Use the app free on desktop and mobile browsers | 5 | frontend-agent | US-006, US-007, US-009 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->

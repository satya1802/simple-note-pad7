# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Covers email/password account creation, login and logout/session-expiry so each user gets access to their own private notepad.

Email and password accounts allow anyone to sign up, log in and log out. Notes are private per user, access depends on a verified session tied to the account. Authentication is email/password only, with no social or single sign-on (assumption surfaced from the confirmed understanding). The app is free with no payments or paid plans.

**Related:** US-001, US-002, US-003

### EPIC-002 · approved · source: planning:EPIC-002

Core product capability: users create, view, edit and delete notes, each a title plus plain-text body, saved automatically server-side for cross-device access.

Changes save automatically to the server-side store so notes are available across devices. Rich text formatting, folders/tags and file/image attachments are explicitly out of scope for this version.

**Related:** US-004, US-005, US-006, US-007, US-008

### EPIC-003 · approved · source: planning:EPIC-003

Users browse their notes as a list and find them with a keyword search box.

The list and search operate only over the logged-in user's own notes.

**Related:** US-009, US-010

### EPIC-004 · approved · source: planning:EPIC-004

Ensures notes stay private per user in a server-side database, lets users delete their own account and data, and delivers the app as a free, responsive web app for desktop and mobile.

Notes are private to each user with standard data-protection practices; there is no sharing or collaboration. Users can delete their own account and its notes. The app is a responsive web application for desktop and mobile browsers, free to use with no payments. Scale is modest (thousands of individual users), with no stated regulatory region (assumptions surfaced from the confirmed understanding).

**Related:** US-011, US-012, US-013

### SPRINT-1 · approved · source: plan:SPRINT-1

First sprint of the approved v1 plan, focused on standing up account access.

Goal: Stand up accounts: sign-up, login, logout and session expiry. Capacity: 20 points. Part of plan version 1 (approved).

**Related:** EPIC-001

### SPRINT-2 · approved · source: plan:SPRINT-2

Second sprint of the approved v1 plan, focused on core note operations and privacy enforcement.

Goal: Core note CRUD, note list, and per-user privacy enforcement. Capacity: 20 points. Part of plan version 1 (approved).

**Related:** EPIC-002, EPIC-003, EPIC-004

### SPRINT-3 · approved · source: plan:SPRINT-3

Third sprint of the approved v1 plan, focused on refining note editing and adding search and account deletion.

Goal: Note editing, auto-save, search, and account deletion. Capacity: 20 points. Part of plan version 1 (approved).

**Related:** EPIC-002, EPIC-003, EPIC-004

### SPRINT-4 · approved · source: plan:SPRINT-4

Fourth sprint of the approved v1 plan, focused on responsive layout polish.

Goal: Responsive layout polish across the app. Capacity: 20 points. Part of plan version 1 (approved).

**Related:** EPIC-004
<!-- sdlc:auto:end narrative -->

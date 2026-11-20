# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECH-STACK · approved · source: requirements:v1

Technology stack approved by the product owner for a lightweight, low-cost note-taking app.

Backend: FastAPI 0.115 -- lean framework for account and CRUD/search endpoints at modest cost. Cloud: AWS -- hosts web app, server and database together with usage-based pricing for thousands of users. Database: PostgreSQL 16 -- relational storage for private notes/accounts across devices, with built-in full-text search for the search box. Frontend: React 19 -- single responsive web app (list, editor, live search) for desktop and phone browsers; widely used, easiest to maintain. Design must use exactly these, no substitutions.

### REQ-SERVICES · approved · source: requirements:v1

One external service approved: an SMTP email provider for transactional mail.

Email: SMTP server (SaaS), used for password-reset links and optional address verification during email/password sign-up. Env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD. API keys needed by the app: SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER (store as <your-smtp-host>, <your-smtp-port>, <your-smtp-user>, <your-smtp-password> in config, never literal values).

### REQ-SCOPE · approved · source: requirements:v1

Defines what is in scope (core notepad capabilities) and explicitly out of scope for this version.

In scope: email/password sign-up, login/logout, private per-user note space, create/view/edit/delete note (title + plain text), note list view, search by keyword, server-side sync across devices, responsive desktop/mobile layout, email/password-only accounts (no social/SSO), automatic save, free with no payments. Out of scope -- do not design or build: rich text formatting, folders/tags, and file/image attachments.

### REQ-FEAT-SIGNIN · approved · source: requirements:Sign-in & accounts

Functional requirements for account creation, login, logout and account deletion.

- Sign up with email and password: valid unused email + password meeting rules creates an account and signs the user into an empty note space; refused with clear message if email already registered, email format invalid, or password fails requirements.
- Log in to an account: registered user logs in with email/password and reaches their own note list; same notes appear across devices (server-side storage).
- Log out: ends session so notes cannot be viewed/edited from that device without logging in again; while logged out, opening a note or note list redirects to login with no note content shown.
- Delete account and notes: logged-in user can delete account and all notes after confirming; cancelling leaves account and notes unchanged.

### REQ-FEAT-WRITING · approved · source: requirements:Writing notes

Functional requirements for creating, viewing, editing, auto-saving and deleting notes.

- Create a note: title + plain-text body saved to private space and shown in list; empty title still saves note, labelled with placeholder or first line; only plain text stored.
- View a note: opens full title and plain-text body; notes belonging to other accounts cannot be opened.
- Edit a note: title/body changes saved as updated plain-text content; list reflects updated title and ordering.
- Automatic saving: edits save automatically after user pauses/stops typing, with a saved indication, no save button; reopening on same or another device shows latest saved content.
- Delete a note: removed from note space on every device after confirmation; cancelling keeps the note unchanged.

### REQ-FEAT-FINDING · approved · source: requirements:Finding notes

Functional requirements for browsing and searching the user's own notes.

- Note list view: shows all of the user's notes by title or placeholder when untitled; empty state invites creating the first note when there are none.
- Search notes by keyword: typing a keyword filters to notes whose title or body contains it; clear 'no matching notes' message when nothing matches; clearing the box restores the full list.

### REQ-FEAT-ACCESS · approved · source: requirements:Access & platform

Functional requirement that the notepad is a free, responsive web app with no paid tiers.

- Free responsive web app: usable in desktop or mobile browser at no cost; creating, viewing, editing, deleting and searching notes never requires payment, billing or a paid plan.

### NFR-001 · approved · source: requirements:NFR-001

[security] Passwords must be stored only as hashes, never in plain text.

User passwords must be stored only in hashed form so account credentials cannot be read from the database.

### NFR-002 · approved · source: requirements:NFR-002

[security] Sessions must expire and end immediately on logout or account deletion.

A signed-in session must expire after a period; signing out or deleting the account ends the session immediately. An expired or ended session is rejected, requiring re-login before viewing or editing notes.

### NFR-003 · approved · source: requirements:NFR-003

[privacy] Notes must be visible only to their owner, with no sharing or collaboration.

No note or note list content is returned without a valid session tied to the account; a user cannot open a note belonging to someone else.

### NFR-004 · approved · source: requirements:NFR-004

[security] Login failure messages must not reveal which field (email or password) was wrong.

When email and password do not match an account, the user is told only that the credentials are incorrect.

### NFR-005 · approved · source: requirements:NFR-005

[privacy] Account deletion must remove all user data and end active sessions.

When a user confirms account deletion, their account and all notes are removed from the server and active sessions end so they can no longer log in with the old credentials.

### NFR-006 · approved · source: requirements:NFR-006

[availability] Auto-save must never silently lose an edit.

Edits save automatically after the user pauses/stops typing, with a saved indication. If a save fails because the server is unreachable, the user is told the change is not yet saved, and the app retries or lets the user retry.

### NFR-007 · approved · source: requirements:NFR-007

[usability] The app must be responsive on both desktop and mobile browser widths, no native app required.

The app must present a responsive layout usable at both desktop and mobile browser widths.

### NFR-008 · approved · source: requirements:NFR-008

[scalability] The app must run dependably at a modest scale (thousands, not millions, of users).

The app must support individual user scale in the thousands rather than millions.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-20

**Capabilities in scope:** Email and password sign-up, Login and logout, Private per-user note space, Create a note (title plus plain text), View a note, Edit a note, Delete a note, Note list view, Search notes by keyword, Notes saved server-side and synced across devices, Responsive layout for desktop and mobile browsers, Email and password accounts (no social or single sign-on), Automatic save of note changes, Free to use with no payments or paid plans

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The server only needs to do a handful of things: register and log users in, and create, read, update, delete and search their notes. FastAPI is a lean, modern Python framework that does this with little code, which keeps a free app cheap to build and run at your modest scale. |
| cloud | AWS | A free, global notepad needs dependable, inexpensive hosting that can grow if usage does. AWS covers the whole app — the web app, the server and the database — in one place, with usage-based pricing that stays very low while you only have thousands of users. |
| database | PostgreSQL | Every note (title plus plain-text body) and every account is private and must survive across a user's devices, which is exactly what a reliable relational database is for. PostgreSQL also has built-in full-text search, so the search box can be delivered without adding a separate search product at your scale. |
| frontend | React | Your product is a single responsive web app that has to feel instant on both desktop and phone browsers: a list of notes, an editor, and a live search box. React handles exactly this kind of interactive, single-page experience, and because it's the most widely used option here it will be the easiest to maintain and extend later. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Account Access and Authentication

Email and password accounts allow anyone to sign up, log in and log out. Notes are private per user, so access depends on a verified session tied to the account. Authentication is email/password only, with no social or single sign-on (assumption surfaced from the confirmed understanding). The app is free with no payments or paid plans.

### US-001: Sign up with email and password

**Priority:** critical

> As a new visitor, I want to create an account using my email address and a password, so that I can have my own private notepad.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the sign-up page and not logged in | I enter a valid, unused email address and a password that meets the stated requirements and submit | my account is created, my password is stored only in hashed form, and I am signed in to my own empty note space |
| AC-002 | I am on the sign-up page | I enter an email address that already has an account | the account is not created and I see a message that the email is already registered |
| AC-003 | I am on the sign-up page | I submit with an invalid email format or a password that does not meet the stated requirements | the account is not created and I see a message explaining what to correct |

### US-002: Log in to an existing account

**Priority:** critical

> As a registered user, I want to log in with my email and password, so that I can access my private notes from any device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I have a registered account and I am on the login page | I enter my correct email and password and submit | I am signed in and taken to my note list showing only my own notes |
| AC-005 | I am on the login page | I enter an email and password that do not match a registered account | I am not signed in and I see a message that the credentials are incorrect, without revealing which field was wrong |
| AC-006 | I log in successfully from a second device | I open my note list on that device | I see the same notes that are saved server-side for my account |

### US-003: Log out and session expiry

**Priority:** high

> As a logged-in user, I want to log out and have my session expire after a period, so that others cannot access my notes from my device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I am logged in | I choose to log out | my session ends and I must log in again before I can view or edit any notes |
| AC-008 | I am logged in and my session has reached its expiry | I next try to access my notes | the expired session is rejected and I am asked to log in again |
| AC-009 | I am logged out | I attempt to open a note or the note list directly | I am not shown any note content and am directed to log in |

## EPIC-002: Note Management

The core of the product: users create, view, edit and delete notes. Each note is a title plus a plain-text body. Changes save automatically to the server-side store so notes are available across devices. Rich text formatting, folders/tags and file/image attachments are out of scope for this version.

### US-004: Create a note

**Priority:** critical

> As a logged-in user, I want to create a new note with a title and a plain-text body, so that I can capture something I want to keep.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | I am logged in and viewing my note list | I choose to create a new note and enter a title and plain-text body | the note is saved to my private note space on the server and appears in my note list |
| AC-011 | I am creating a note | I leave the title empty but enter body text | the note is still saved and is shown in the list with a placeholder or the first line of the body as its label |
| AC-012 | I am creating a note | I enter formatting, folders/tags or attempt to attach a file | only plain text is stored, as rich text, folders/tags and attachments are out of scope |

### US-005: Automatic save of note changes

**Priority:** high

> As a logged-in user, I want my edits to be saved automatically as I type, so that I do not lose work and do not have to remember to save.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | I am editing a note's title or body | I pause or stop typing | the change is saved server-side without me pressing a save button, and a saved indication is shown |
| AC-014 | I have made an edit that was saved | I reopen the note on the same or another device | I see the latest saved content |
| AC-015 | a save attempt fails because the server is unreachable | I am editing a note | I see that the change is not yet saved and the app retries or lets me retry so my edit is not silently lost |

### US-006: View a note

**Priority:** critical

> As a logged-in user, I want to open and read a note's title and body, so that I can see what I saved earlier.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am logged in and viewing my note list | I select one of my notes | its full title and plain-text body are displayed |
| AC-017 | I am logged in | I attempt to open a note that does not belong to my account | the note is not shown, keeping notes private to each user |

### US-007: Edit a note

**Priority:** critical

> As a logged-in user, I want to change the title or body of an existing note, so that I can keep my notes up to date.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | I am viewing one of my notes | I change the title or body text | the updated plain-text content is saved to my note space |
| AC-019 | I have edited a note | I return to the note list | the list reflects the updated title and ordering |

### US-008: Delete a note

**Priority:** high

> As a logged-in user, I want to delete a note I no longer need, so that my note list stays relevant.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | I am viewing one of my notes | I choose to delete it and confirm | the note is removed from my note space server-side and no longer appears in my list on any device |
| AC-021 | I am asked to confirm deletion | I cancel instead of confirming | the note is kept unchanged |

## EPIC-003: Finding and Browsing Notes

Users see their notes as a list and find them using a keyword search box. The list and search operate only over the logged-in user's own notes.

### US-009: View the note list

**Priority:** critical

> As a logged-in user, I want to see all my notes in a list, so that I can browse and pick the one I want.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | I am logged in and have one or more notes | I open the note list | I see each of my notes represented by its title (or a placeholder/first line when untitled), and only my own notes |
| AC-023 | I am logged in and have no notes yet | I open the note list | I see an empty state inviting me to create my first note |

### US-010: Search notes by keyword

**Priority:** high

> As a logged-in user, I want to search my notes with a keyword box, so that I can quickly find a note without scrolling.

| ID | Given | When | Then |
|---|---|---|---|
| AC-024 | I am logged in with several notes | I type a keyword into the search box | the list shows only my notes whose title or body contains that keyword |
| AC-025 | I have typed a keyword that matches no notes | the search completes | I see a clear 'no matching notes' message |
| AC-026 | I have an active search | I clear the search box | the full list of my notes is shown again |

## EPIC-004: Privacy, Account Data and Platform

Notes are private to each user and stored in a server-side database with standard data-protection practices; there is no sharing or collaboration. Users can delete their own account and its notes. The app is a responsive web application for desktop and mobile browsers, free to use with no payments. Scale is modest (thousands of individual users), with no stated regulatory region (assumptions surfaced from the confirmed understanding).

### US-011: Keep notes private per user

**Priority:** critical

> As a logged-in user, I want my notes to be visible only to me, so that my personal notes stay private.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | two different users each have notes | either user is logged in and views their list or searches | each sees only their own notes and never the other user's notes, with no sharing or collaboration feature available |
| AC-028 | I am not logged in | I try to reach any note or note list | no note content is returned without a valid session |

### US-012: Delete my account

**Priority:** medium

> As a logged-in user, I want to delete my account and its notes, so that I can remove my data when I no longer want to use the app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-029 | I am logged in | I choose to delete my account and confirm | my account and all my notes are removed from the server and my active sessions end so I can no longer log in with the old credentials |
| AC-030 | I am asked to confirm account deletion | I cancel | my account and notes are kept unchanged |

### US-013: Use the app free on desktop and mobile browsers

**Priority:** high

> As a user, I want to use the notepad for free in a browser on any device, so that I can access my notes wherever I am without paying.

| ID | Given | When | Then |
|---|---|---|---|
| AC-031 | I open the app in a desktop or mobile browser | the interface loads | the layout is responsive and usable at both desktop and mobile widths without a native app |
| AC-032 | I use any part of the app | I create, view, edit, delete or search notes | no payment, billing or paid plan is ever required, as the app is free to use |
<!-- sdlc:auto:end epics -->

# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Account Access and Authentication: email/password accounts let anyone sign up, log in and log out, with notes private per user behind a verified session.

Authentication is email/password only, no social or single sign-on (assumption surfaced from the confirmed understanding). The app is free with no payments or paid plans.

**Related:** US-001, US-002, US-003

### EPIC-002 · approved · source: planning:EPIC-002

Note Management: the core product -- users create, view, edit and delete notes (title + plain-text body), auto-saved server-side for cross-device availability.

Rich text formatting, folders/tags and file/image attachments are explicitly out of scope for this version.

**Related:** US-004, US-005, US-006, US-007, US-008

### EPIC-003 · approved · source: planning:EPIC-003

Finding and Browsing Notes: users see their notes as a list and find them via a keyword search box.

The list and search operate only over the logged-in user's own notes.

**Related:** US-009, US-010

### EPIC-004 · approved · source: planning:EPIC-004

Privacy, Account Data and Platform: notes are private per user with no sharing/collaboration; users can delete their account and data; the app is a free, responsive web app for desktop and mobile.

Scale is modest (thousands of individual users), with no stated regulatory region (assumption surfaced from the confirmed understanding).

**Related:** US-011, US-012, US-013
<!-- sdlc:auto:end narrative -->

# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| email | citext | False | — | False |
| password_hash | text | False | — | False |
| created_at | timestamptz | False | — | False |
| email_verified | boolean | False | — | False |

### notes

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| title | text | False | — | True |
| body | text | False | — | False |
| search_vector | tsvector | False | — | True |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### sessions

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| token | text | True | — | False |
| user_id | uuid | False | users.id | False |
| created_at | timestamptz | False | — | False |
| expires_at | timestamptz | False | — | False |

### password_reset_tokens

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| token | text | True | — | False |
| user_id | uuid | False | users.id | False |
| created_at | timestamptz | False | — | False |
| expires_at | timestamptz | False | — | False |
| used_at | timestamptz | False | — | True |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | notes | one-to-many |
| users | sessions | one-to-many |
| users | password_reset_tokens | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    citext email
    text password_hash
    timestamptz created_at
    boolean email_verified
  }
  notes {
    uuid id PK
    uuid user_id FK
    text title
    text body
    tsvector search_vector
    timestamptz created_at
    timestamptz updated_at
  }
  sessions {
    text token PK
    uuid user_id FK
    timestamptz created_at
    timestamptz expires_at
  }
  password_reset_tokens {
    text token PK
    uuid user_id FK
    timestamptz created_at
    timestamptz expires_at
    timestamptz used_at
  }
  users ||--o{ notes : "one-to-many"
  users ||--o{ sessions : "one-to-many"
  users ||--o{ password_reset_tokens : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->

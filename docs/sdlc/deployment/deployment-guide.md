# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| Web App Hosting | React 19 SPA static build served from S3 behind CloudFront | Static assets (CDN) | CDN edge caching | dev |
| API Service | FastAPI 0.115 under Uvicorn, containerised | Python 3.12 on AWS App Runner / ECS Fargate | 1 small instance for dev, horizontal if load grows | dev |
| Database | PostgreSQL 16 | Amazon RDS for PostgreSQL 16 (single instance) | Vertical; sized for thousands of users | dev |
| SMTP Email | External SMTP server for transactional mail | SaaS over SMTP | Provider-managed | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_Web_App_Hosting["Web App Hosting<br/>React 19 SPA static build served from S3 behind CloudFront"]
  n_API_Service["API Service<br/>FastAPI 0.115 under Uvicorn, containerised"]
  n_Database["Database<br/>PostgreSQL 16"]
  n_SMTP_Email["SMTP Email<br/>External SMTP server for transactional mail"]
  n_Web_App_Hosting -->|"HTTPS"| n_API_Service
  n_API_Service -->|"PostgreSQL/TLS"| n_Database
  n_API_Service -->|"SMTP/TLS"| n_SMTP_Email
```
<!-- sdlc:auto:end topology -->

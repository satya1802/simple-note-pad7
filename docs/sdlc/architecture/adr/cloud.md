<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Google Cloud
- Azure

## Decision Outcome

Chosen option: AWS, because AWS hosts the whole app in one place: the SPA on S3/CloudFront, the FastAPI API on App Runner/ECS Fargate, and PostgreSQL on RDS, with usage-based pricing that stays very low at modest scale.

## Consequences

Managed services keep operations light; RDS and compute add small fixed cost compared with a single VM but give durability and encryption at rest for private data.
<!-- sdlc:auto:end adr -->
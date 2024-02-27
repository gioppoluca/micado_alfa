#  Dev env to test loopback integration with keycloak to protect APIs
This project uses:
- Postgresql DB, configured with 2 DB one for the backend and the other for keycloak
- keycloak for identity management
- redis, needed by the loopback auth system
- backend application built with loopback latest release and the authentication-service included

The only goal of this project is testing and having an API protected by a JWT token
There will have to be a frontend application that pass the credentials of the user and this will generate a JWT token used to access all the protected APIs

The expected flow is that the user will be authenticated using keycloak

## Usage

- Clone the repo
- docker-compose up
- docker-compose exec backend /bin/bash
- within the backend container:
  - cd micado-backend/
  - npm run start

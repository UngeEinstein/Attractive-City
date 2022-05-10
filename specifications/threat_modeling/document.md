# Thread Modeling

## Assets

This section contains

- A1: Application
- A2: Code base
- A3: Information on experiences
- A4: User credentials
- A5: User information

## ~~Risks~~

- R1.1: Service temporarily denied
- R1.2: Service lost
- R1.3: Service tampered
- R2.2: Code base disclosed
- R2.1: Code base lost
- R3.1: Experience information disclosed
- R3.2: Experience information lost
- R3.3: Experience information tampered
- R4.1: User credentials disclosed
- R4.2: User credentials lost
- R4.3: User credentials tampered
- R5.1: User information disclosed
- R5.2: User information lost

## Identified threats

### Spoofing

- Register views on behalf of another user, in our outside of group context.
  - Only allow request to backend made by frontend.

### Tampering

### ~~Repudiation~~

### Information disclosure

- Disclose membership of a user in a group
  - Resolved. Only a problem if groupId is known.
- Disclose ratings of experiences by a user
  - userId of other users should be more difficult to obtain.
  - Only allow request to backend made by frontend.
- Email of a user
  - Encryption in database
  - userId of other users should be more difficult to obtain.

### Denial of Service (DOS)

- DOS during user testing.
  - Follow security checklist (https://firebase.google.com/support/guides/security-checklist).

### ~~Elevation of privelege~~

### Vulnerabilities

‌- HTML injection in group name.

- Validate input -> Cannot contain script code or HTML code.

- Package dependencies in frontend and backend.

  - Remember to keep the packages up to date.

- Can be blackmailed/bribed into giving up google cloud credentials.
  - Only give access to those who need it.
- Google account can be comprimised which gives access to google cloud.
- Ensure that every one who has access to google cloud have enable two step verification.
- Firebase authentication -> User protected
- User password and email can be read from state in browser.
  - Encrypt password and email state.
- Password can be brute forced -> No maximum amount.
  - Maximum tries.
  - Strong password with numbers and letters.
- Github repo stores database credentials -> relies on Githubs security.
  - Move to a safer location.

## Attack surface:

- Frontend application -> Spoofing, bruteforce, malicious content.
- Backend api -> Spoofing
- Google Cloud Platform -> Database

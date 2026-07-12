# Database Schema

## Core entities

### User
- id
- name
- email
- password
- role
- createdAt
- updatedAt

### Department
- id
- name
- code
- createdAt
- updatedAt

### Category
- id
- name
- description
- createdAt
- updatedAt

### Asset
- id
- name
- tag
- category
- department
- status
- assignedTo
- purchaseDate
- warrantyUntil
- location
- createdAt
- updatedAt

### Booking
- id
- asset
- user
- startDate
- endDate
- status
- createdAt
- updatedAt

### Maintenance
- id
- asset
- type
- description
- scheduledDate
- completedAt
- status
- createdAt
- updatedAt

### Audit
- id
- action
- user
- details
- createdAt
- updatedAt

### Notification
- id
- recipient
- message
- read
- createdAt
- updatedAt

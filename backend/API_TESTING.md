# API Testing Guide

Use these examples to test the API with curl, Postman, or any HTTP client.

## Base URL

```
http://localhost:5000/api
```

## 1. Health Check

```bash
curl http://localhost:5000/api/health
```

## 2. Get All Events

```bash
curl http://localhost:5000/api/events
```

## 3. Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response will include a JWT token. Save it for authenticated requests.

## 4. Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 5. Get User Profile (Authenticated)

```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 6. Register for an Event (Authenticated)

First, get an event ID from `/api/events`, then:

```bash
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "eventId": "EVENT_ID_HERE"
  }'
```

## 7. Get My Registrations (Authenticated)

```bash
curl http://localhost:5000/api/registrations/my-registrations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 8. Unregister from Event (Authenticated)

```bash
curl -X DELETE http://localhost:5000/api/registrations/EVENT_ID_HERE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 9. Get Event by ID

```bash
curl http://localhost:5000/api/events/EVENT_ID_HERE
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

## Validation Errors

Validation errors return status 400 with:

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name"
    }
  ]
}
```

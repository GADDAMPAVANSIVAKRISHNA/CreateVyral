{
  "name": "ServiceRequest",
  "type": "object",
  "properties": {
    "client_email": {
      "type": "string"
    },
    "creator_id": {
      "type": "string"
    },
    "service_type": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "budget": {
      "type": "number"
    },
    "deadline": {
      "type": "string",
      "format": "date"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "accepted",
        "in_progress",
        "completed",
        "cancelled"
      ],
      "default": "pending"
    },
    "attachments": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "client_email",
    "creator_id",
    "service_type"
  ]
}
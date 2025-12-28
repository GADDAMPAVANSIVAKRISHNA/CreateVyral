{
  "name": "Enrollment",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string"
    },
    "course_id": {
      "type": "string"
    },
    "progress": {
      "type": "number",
      "default": 0
    },
    "completed_modules": {
      "type": "array",
      "items": {
        "type": "number"
      }
    },
    "is_completed": {
      "type": "boolean",
      "default": false
    },
    "certificate_url": {
      "type": "string"
    },
    "enrolled_date": {
      "type": "string",
      "format": "date"
    }
  },
  "required": [
    "user_email",
    "course_id"
  ]
}
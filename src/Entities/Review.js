{
  "name": "Review",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string"
    },
    "user_name": {
      "type": "string"
    },
    "course_id": {
      "type": "string"
    },
    "rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5
    },
    "comment": {
      "type": "string"
    }
  },
  "required": [
    "user_email",
    "course_id",
    "rating"
  ]
}
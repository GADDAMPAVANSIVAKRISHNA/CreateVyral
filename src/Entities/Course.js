{
  "name": "Course",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "photography",
        "videography",
        "editing",
        "reels_creation",
        "influencer_growth",
        "dance",
        "singing",
        "fitness",
        "social_media",
        "youtube_growth"
      ]
    },
    "tier": {
      "type": "string",
      "enum": [
        "basic",
        "intermediate",
        "advanced"
      ]
    },
    "price": {
      "type": "number"
    },
    "description": {
      "type": "string"
    },
    "thumbnail": {
      "type": "string"
    },
    "modules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "duration": {
            "type": "string"
          },
          "video_url": {
            "type": "string"
          }
        }
      }
    },
    "skill_outcomes": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "instructor": {
      "type": "string"
    },
    "total_duration": {
      "type": "string"
    },
    "students_enrolled": {
      "type": "number",
      "default": 0
    },
    "rating": {
      "type": "number",
      "default": 4.8
    }
  },
  "required": [
    "title",
    "category",
    "tier",
    "price"
  ]
}
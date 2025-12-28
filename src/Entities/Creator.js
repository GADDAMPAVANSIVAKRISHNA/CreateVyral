{
  "name": "Creator",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string",
      "description": "Email of the user"
    },
    "full_name": {
      "type": "string"
    },
    "role": {
      "type": "string",
      "enum": [
        "photographer",
        "video_editor",
        "graphic_designer",
        "videographer",
        "thumbnail_artist",
        "social_media_manager",
        "content_writer",
        "voice_artist",
        "vfx_editor"
      ]
    },
    "experience_level": {
      "type": "string",
      "enum": [
        "beginner",
        "intermediate",
        "expert"
      ]
    },
    "bio": {
      "type": "string"
    },
    "location": {
      "type": "string"
    },
    "pricing": {
      "type": "number"
    },
    "sample_works": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "social_links": {
      "type": "object",
      "properties": {
        "instagram": {
          "type": "string"
        },
        "youtube": {
          "type": "string"
        },
        "twitter": {
          "type": "string"
        },
        "portfolio": {
          "type": "string"
        }
      }
    },
    "avatar": {
      "type": "string"
    },
    "rating": {
      "type": "number",
      "default": 5.0
    },
    "orders_completed": {
      "type": "number",
      "default": 0
    },
    "response_rate": {
      "type": "number",
      "default": 100
    },
    "is_top_creator": {
      "type": "boolean",
      "default": false
    },
    "responds_fast": {
      "type": "boolean",
      "default": true
    },
    "is_pro": {
      "type": "boolean",
      "default": false,
      "description": "Whether creator has Pro membership"
    }
  },
  "required": [
    "user_email",
    "full_name",
    "role"
  ]
}
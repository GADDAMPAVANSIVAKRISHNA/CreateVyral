{
  "name": "Influencer",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string"
    },
    "full_name": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": [
        "foodie",
        "social_media",
        "trolls",
        "memes",
        "fitness",
        "health",
        "dancer",
        "singer",
        "youtuber",
        "parenting",
        "travel",
        "fashion_beauty",
        "others"
      ]
    },
    "instagram_handle": {
      "type": "string"
    },
    "instagram_followers": {
      "type": "number"
    },
    "youtube_handle": {
      "type": "string"
    },
    "youtube_subscribers": {
      "type": "number"
    },
    "tiktok_handle": {
      "type": "string"
    },
    "location": {
      "type": "string"
    },
    "experience_level": {
      "type": "string",
      "enum": [
        "beginner",
        "intermediate",
        "expert"
      ]
    },
    "sample_images": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "price": {
      "type": "number"
    },
    "avatar": {
      "type": "string"
    },
    "bio": {
      "type": "string"
    },
    "engagement_rate": {
      "type": "number",
      "default": 4.5
    },
    "rating": {
      "type": "number",
      "default": 5.0
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
      "description": "Whether influencer has Pro membership"
    }
  },
  "required": [
    "user_email",
    "full_name",
    "category"
  ]
}
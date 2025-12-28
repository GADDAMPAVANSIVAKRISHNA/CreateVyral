{
  "name": "Campaign",
  "type": "object",
  "properties": {
    "brand_email": {
      "type": "string"
    },
    "brand_name": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "niche": {
      "type": "string"
    },
    "target_location": {
      "type": "string"
    },
    "follower_range": {
      "type": "string",
      "enum": [
        "0-10k",
        "10k-50k",
        "50k-200k",
        "200k-1M",
        "1M+"
      ]
    },
    "content_type": {
      "type": "string",
      "enum": [
        "reel",
        "post",
        "story",
        "youtube_video",
        "multiple"
      ]
    },
    "budget": {
      "type": "number"
    },
    "reference_images": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "deadline": {
      "type": "string",
      "format": "date"
    },
    "status": {
      "type": "string",
      "enum": [
        "open",
        "in_progress",
        "completed",
        "cancelled"
      ],
      "default": "open"
    },
    "applications": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "influencer_id": {
            "type": "string"
          },
          "status": {
            "type": "string"
          },
          "proposal": {
            "type": "string"
          }
        }
      }
    }
  },
  "required": [
    "brand_email",
    "title",
    "budget"
  ]
}
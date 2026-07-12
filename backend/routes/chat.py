"""
MemoryOS AI - Chat Routes

AI-powered chat endpoint that uses business memory and Gemini.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.get("/health")
async def chat_health():
    """Health check for chat module."""
    return {"success": True, "message": "Chat module is available"}

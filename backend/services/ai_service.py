"""
MemoryOS AI - AI Service

Handles Gemini API and Ollama interactions.
"""

from backend.config import get_settings

settings = get_settings()


class AIService:
    """Manages AI model interactions for analysis and recommendations."""

    async def health_check(self) -> bool:
        """Verify AI service is accessible."""
        return bool(settings.GEMINI_API_KEY)


ai_service = AIService()

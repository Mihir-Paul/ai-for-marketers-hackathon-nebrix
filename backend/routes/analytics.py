"""
MemoryOS AI - Analytics Routes

Provides analytics endpoints for revenue, customers, campaigns, and growth.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/health")
async def analytics_health():
    """Health check for analytics module."""
    return {"success": True, "message": "Analytics module is available"}

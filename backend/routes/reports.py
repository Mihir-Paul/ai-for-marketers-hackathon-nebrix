"""
MemoryOS AI - Reports Routes

Generates and retrieves executive, marketing, campaign, and customer reports.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/health")
async def reports_health():
    """Health check for reports module."""
    return {"success": True, "message": "Reports module is available"}

"""
MemoryOS AI - Dashboard Routes

Provides aggregated data endpoints for the dashboard UI.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/health")
async def dashboard_health():
    """Health check for dashboard module."""
    return {"success": True, "message": "Dashboard module is available"}

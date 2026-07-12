"""
MemoryOS AI - Upload Routes

Handles CSV file uploads, validation, parsing, and storage.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.get("/health")
async def upload_health():
    """Health check for upload module."""
    return {"success": True, "message": "Upload module is available"}

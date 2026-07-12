"""
MemoryOS AI - Storage Helper

Handles Supabase Storage operations for file uploads.
"""

from backend.config import get_settings
from database.supabase import get_supabase_admin

settings = get_settings()


class StorageHelper:
    """Manages file uploads and retrieval from Supabase Storage."""

    def __init__(self) -> None:
        self.bucket = settings.SUPABASE_STORAGE_BUCKET

    def upload_file(self, path: str, file_bytes: bytes, content_type: str) -> dict:
        """Upload a file to Supabase Storage."""
        client = get_supabase_admin()
        result = client.storage.from_(self.bucket).upload(path, file_bytes, {"content-type": content_type})
        return {"path": path, "uploaded": True}

    def get_signed_url(self, path: str, expires_in: int = 3600) -> str:
        """Get a signed URL for a stored file."""
        client = get_supabase_admin()
        result = client.storage.from_(self.bucket).create_signed_url(path, expires_in)
        return result.get("signedURL", "")

    def delete_file(self, path: str) -> bool:
        """Delete a file from Supabase Storage."""
        client = get_supabase_admin()
        client.storage.from_(self.bucket).remove([path])
        return True


storage_helper = StorageHelper()

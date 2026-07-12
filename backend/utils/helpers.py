"""
MemoryOS AI - Helper Utilities

Shared utility functions used across the application.
"""

import uuid
from datetime import datetime, timezone


def generate_uuid() -> str:
    """Generate a new UUID4 string."""
    return str(uuid.uuid4())


def utc_now() -> datetime:
    """Return current UTC datetime with timezone info."""
    return datetime.now(timezone.utc)


def format_uuid_short(full_uuid: str, length: int = 8) -> str:
    """Return a short preview of a UUID for logging/display."""
    return full_uuid[:length] if len(full_uuid) >= length else full_uuid


def safe_filename(filename: str) -> str:
    """Sanitize a filename by removing path separators and special characters."""
    # Remove any directory components
    filename = filename.split("/")[-1].split("\\")[-1]
    # Replace spaces with underscores
    filename = filename.replace(" ", "_")
    # Remove any characters that are not alphanumeric, underscore, hyphen, or dot
    filename = "".join(c for c in filename if c.isalnum() or c in "._-")
    return filename.lower()

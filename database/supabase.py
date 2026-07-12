"""
MemoryOS AI - Supabase Connection

Provides Supabase client initialization for database and auth operations.
"""

from supabase import create_client, Client
from backend.config import get_settings

settings = get_settings()

_supabase_client: Client | None = None
_supabase_admin_client: Client | None = None


def get_supabase() -> Client:
    """Get or create the Supabase client (uses anon key)."""
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
    return _supabase_client


def get_supabase_admin() -> Client:
    """Get or create the Supabase admin client (uses service role key)."""
    global _supabase_admin_client
    if _supabase_admin_client is None:
        _supabase_admin_client = create_client(
            settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY
        )
    return _supabase_admin_client

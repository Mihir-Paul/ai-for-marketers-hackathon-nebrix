"""
MemoryOS AI - Auth Dependencies

Reusable FastAPI dependencies for authentication and authorization.

Every protected route should use one of these:
    - get_current_user()      → returns decoded user payload or raises 401
    - verify_access_token()   → returns raw access token string or raises 401
    - require_authenticated_user() → alias for get_current_user (semantic clarity)
"""

import logging
from typing import Annotated

from fastapi import Depends, Header, HTTPException, status

from backend.services.auth_service import auth_service

logger = logging.getLogger("memoryos.auth")


# ---------------------------------------------------------------------------
# Internal helper
# ---------------------------------------------------------------------------

def _extract_bearer_token(authorization: str | None) -> str:
    """
    Pull the JWT from the ``Authorization: Bearer <token>`` header.

    Raises HTTPException 401 if the header is missing or malformed.
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )

    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Authorization header format. Expected 'Bearer <token>'",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = parts[1].strip()
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Empty bearer token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return token


# ---------------------------------------------------------------------------
# Public dependencies
# ---------------------------------------------------------------------------

async def verify_access_token(
    authorization: Annotated[str | None, Header()] = None,
) -> str:
    """
    FastAPI dependency that extracts and validates the bearer token.

    Returns the raw access_token string on success.
    Raises 401 on any failure.
    """
    token = _extract_bearer_token(authorization)
    result = await auth_service.verify_token(token)

    if not result.success:
        logger.warning("Token verification failed: %s", result.error)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result.message,
            headers={"WWW-Authenticate": "Bearer"},
        )

    return token


async def get_current_user(
    authorization: Annotated[str | None, Header()] = None,
) -> dict:
    """
    FastAPI dependency that returns the authenticated user payload.

    Verifies the JWT locally (fast) and also fetches the full user
    object from Supabase for up-to-date metadata.

    Returns a dict with at minimum: {"id": ..., "email": ...}
    Raises 401 on any failure.
    """
    token = _extract_bearer_token(authorization)
    result = await auth_service.get_current_user(token)

    if not result.success or not result.user:
        logger.warning("get_current_user failed: %s", result.error)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result.message,
            headers={"WWW-Authenticate": "Bearer"},
        )

    return result.user


# Semantic alias - use in routes where you want the name to read clearly
require_authenticated_user = get_current_user


# Type aliases for Annotated params in route signatures
AccessToken = Annotated[str, Depends(verify_access_token)]
CurrentUser = Annotated[dict, Depends(get_current_user)]

"""
MemoryOS AI - Authentication Routes

Signup, login, logout, current user, password reset, OTP.
All credential management is delegated to Supabase Auth via auth_service.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException, status

from backend.services.auth_service import auth_service
from backend.utils.auth_dependencies import CurrentUser, AccessToken
from backend.utils.validators import (
    AuthResponse,
    LoginRequest,
    ResetPasswordRequest,
    SendOTPRequest,
    SignupRequest,
    VerifyOTPRequest,
)

logger = logging.getLogger("memoryos.auth")

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ---------------------------------------------------------------------------
# POST /auth/signup
# ---------------------------------------------------------------------------

@router.post(
    "/signup",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new account",
)
async def signup(body: SignupRequest) -> dict:
    """
    Register a new user via Supabase Auth.

    Company and industry are stored in user_metadata so they can be
    used later during profile/company creation (Phase 3).
    """
    result = await auth_service.signup(
        email=body.email,
        password=body.password,
        metadata={
            "full_name": body.full_name,
            "company_name": body.company_name,
            "industry": body.industry,
        },
    )

    if not result.success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"success": False, "message": result.message, "error": result.error},
        )

    return {
        "success": True,
        "message": result.message,
        "data": {
            "user": result.user,
            "session": result.session,
        },
    }


# ---------------------------------------------------------------------------
# POST /auth/login
# ---------------------------------------------------------------------------

@router.post(
    "/login",
    response_model=AuthResponse,
    summary="Sign in with email and password",
)
async def login(body: LoginRequest) -> dict:
    """Authenticate and return access + refresh tokens."""
    result = await auth_service.login(email=body.email, password=body.password)

    if not result.success:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"success": False, "message": result.message, "error": result.error},
        )

    return {
        "success": True,
        "message": result.message,
        "data": {
            "user": result.user,
            "session": result.session,
        },
    }


# ---------------------------------------------------------------------------
# POST /auth/logout
# ---------------------------------------------------------------------------

@router.post(
    "/logout",
    response_model=AuthResponse,
    summary="Invalidate current session",
)
async def logout(token: AccessToken) -> dict:
    """Sign out the currently authenticated user."""
    result = await auth_service.logout(access_token=token)

    if not result.success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"success": False, "message": result.message, "error": result.error},
        )

    return {"success": True, "message": result.message}


# ---------------------------------------------------------------------------
# GET /auth/me
# ---------------------------------------------------------------------------

@router.get(
    "/me",
    response_model=AuthResponse,
    summary="Get current authenticated user",
)
async def me(user: CurrentUser) -> dict:
    """Return the authenticated user's profile from Supabase Auth."""
    return {
        "success": True,
        "message": "User retrieved successfully",
        "data": {"user": user},
    }


# ---------------------------------------------------------------------------
# POST /auth/send-otp
# ---------------------------------------------------------------------------

@router.post(
    "/send-otp",
    response_model=AuthResponse,
    summary="Send a one-time password via email",
)
async def send_otp(body: SendOTPRequest) -> dict:
    """Send an OTP code to the given email for verification."""
    result = await auth_service.send_otp(email=body.email)

    if not result.success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"success": False, "message": result.message, "error": result.error},
        )

    return {"success": True, "message": result.message}


# ---------------------------------------------------------------------------
# POST /auth/verify-otp
# ---------------------------------------------------------------------------

@router.post(
    "/verify-otp",
    response_model=AuthResponse,
    summary="Verify an OTP code",
)
async def verify_otp(body: VerifyOTPRequest) -> dict:
    """Verify the OTP and return a session."""
    result = await auth_service.verify_otp(email=body.email, token=body.token)

    if not result.success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"success": False, "message": result.message, "error": result.error},
        )

    return {
        "success": True,
        "message": result.message,
        "data": {
            "user": result.user,
            "session": result.session,
        },
    }


# ---------------------------------------------------------------------------
# POST /auth/reset-password
# ---------------------------------------------------------------------------

@router.post(
    "/reset-password",
    response_model=AuthResponse,
    summary="Request a password reset email",
)
async def reset_password(body: ResetPasswordRequest) -> dict:
    """Send a password-reset link to the given email."""
    result = await auth_service.reset_password(email=body.email)

    if not result.success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"success": False, "message": result.message, "error": result.error},
        )

    return {"success": True, "message": result.message}

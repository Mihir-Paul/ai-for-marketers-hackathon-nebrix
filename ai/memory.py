"""
MemoryOS AI - Memory Module

Manages business context memory for AI interactions.
Provides structured retrieval of company, customer, and campaign data.
"""


class BusinessMemory:
    """Retrieves and structures business context for AI prompts."""

    def __init__(self, company_id: str) -> None:
        self.company_id = company_id

    async def get_context(self) -> dict:
        """Retrieve all relevant business context for this company."""
        return {
            "company_id": self.company_id,
            "company": {},
            "customers": [],
            "campaigns": [],
            "recent_uploads": [],
        }

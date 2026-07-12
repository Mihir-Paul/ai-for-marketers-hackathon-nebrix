"""
MemoryOS AI - CSV Service

Handles CSV file parsing, validation, and data cleaning using Pandas.
"""

import pandas as pd
from io import StringIO


class CSVService:
    """Processes uploaded CSV files for marketing data analysis."""

    def parse_csv(self, content: str) -> pd.DataFrame:
        """Parse CSV string content into a DataFrame."""
        return pd.read_csv(StringIO(content))

    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Clean and normalize a DataFrame."""
        # Drop fully empty rows
        df = df.dropna(how="all")
        # Strip whitespace from string columns
        for col in df.select_dtypes(include=["object"]).columns:
            df[col] = df[col].str.strip()
        return df

    def get_summary(self, df: pd.DataFrame) -> dict:
        """Return a summary of the DataFrame."""
        return {
            "rows": len(df),
            "columns": list(df.columns),
            "dtypes": {col: str(dtype) for col, dtype in df.dtypes.items()},
        }


csv_service = CSVService()

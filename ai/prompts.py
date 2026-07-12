"""
MemoryOS AI - Prompt Templates

Reusable prompt templates for Gemini API interactions.
"""

ANALYSIS_PROMPT = """You are an expert Chief Marketing Officer (CMo).
Analyze the following business data and provide actionable insights:

{data}

Provide:
1. Key findings
2. Performance assessment
3. Recommendations
4. Action items
"""

RECOMMENDATIONS_PROMPT = """Based on the following business context, provide marketing recommendations:

Business: {company_name}
Industry: {industry}
Data: {data}

Give 3-5 specific, actionable recommendations with expected impact.
"""

REPORT_PROMPT = """Generate a comprehensive {report_type} report for:

Company: {company_name}
Period: {period}
Data: {data}

Format the report with clear sections, metrics, and insights.
"""

CHAT_PROMPT = """You are MemoryOS AI, an intelligent marketing assistant.

Business Context:
{context}

User Question: {question}

Provide a helpful, data-driven response.
"""

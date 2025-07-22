import re
import nltk
from nltk.tokenize import word_tokenize

# Download NLTK data if missing
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# Expanded healthcare and drug discovery keywords
HEALTHCARE_KEYWORDS = [
    "healthcare", "health", "medicine", "drug", "pharmaceutical", "clinical", "trial",
    "patient", "patients", "disease", "diseases", "treatment", "treatments", "therapy", "therapies",
    "diagnosis", "diagnostic", "diagnostics", "vaccine", "vaccination", "biotechnology", "biotech",
    "genomics", "proteomics", "transcriptomics", "metabolomics", "drug discovery", "drug design",
    "drug screening", "compound library", "target validation", "assay", "high-throughput screening",
    "lead optimization", "admet", "toxicity", "toxicology", "efficacy", "pharmacology",
    "pharmacokinetics", "pharmacodynamics", "therapeutics", "hospital", "hospitals", "clinical trial",
    "preclinical", "molecular docking", "qsar", "structure-activity relationship", "bioavailability",
    "ligand", "protein", "receptor", "enzyme", "biomarker", "rna", "dna", "mutagenesis",
    "cell line", "animal model", "in vitro", "in vivo", "in silico", "pathway", "mechanism of action"
]

# Expanded denied topics keywords
DENIED_KEYWORDS = [
    "politics", "political", "election", "elections", "government", "policy", "president",
    "sports", "sport", "football", "soccer", "basketball", "baseball", "cricket", "tennis", "olympics",
    "entertainment", "movie", "movies", "film", "films", "cinema", "music", "concert", "celebrity", "celebrities",
    "gaming", "video game", "video games", "esports", "streaming", "netflix", "hbo", "disney", "tv show", "tv series",
    "gossip", "drama", "reality show", "theater", "cartoon", "anime"
]

def is_healthcare_related(text):
    """Check if text is related to healthcare or drug discovery."""
    text = text.lower()
    tokens = word_tokenize(text)
    return any(keyword in tokens for keyword in HEALTHCARE_KEYWORDS)

def is_denied_topic(text):
    """Check if text contains denied topic keywords."""
    text = text.lower()
    tokens = word_tokenize(text)
    return any(keyword in tokens for keyword in DENIED_KEYWORDS)

def validate_query(query):
    """Validate if the query is related to healthcare or drug discovery."""
    if not is_healthcare_related(query):
        return False, "Query must be related to healthcare or drug discovery."
    if is_denied_topic(query):
        return False, "Query contains topics that are not allowed (e.g., politics, sports, entertainment)."
    return True, ""

def validate_response(response):
    """Validate if the response is on-topic."""
    if not is_healthcare_related(response):
        return False, "Response must be related to healthcare or drug discovery."
    if is_denied_topic(response):
        return False, "Response contains topics that are not allowed (e.g., politics, sports, entertainment)."
    return True, ""

if __name__ == "__main__":
    import sys
    action = sys.argv[1]
    text = sys.argv[2]
    
    if action == "validate_query":
        is_valid, message = validate_query(text)
        print(f"{is_valid}::{message}")
    elif action == "validate_response":
        is_valid, message = validate_response(text)
        print(f"{is_valid}::{message}")

// Simple keyword-based domain guard. Replace or extend with ML classifier for more sophistication.
export function isDrugDiscoveryOrHealthcareQuery(query: string): boolean {
  const keywords = [
    'drug discovery', 'compound', 'pharmacology', 'clinical trial', 'inhibitor', 
    'molecule', 'bioactivity', 'therapeutic', 'target', 'side effect', 'efficacy',
    'adverse event', 'toxicology', 'dose', 'medication', 'disease', 'treatment',
    'symptom', 'biomarker', 'receptor', 'enzyme', 'protein', 'healthcare', 'patient',
    'diagnosis', 'clinical', 'therapy', 'medicine',"healthcare", "health", "medicine", "drug", "pharmaceutical", "clinical", "trial",
    "patient", "patients", "disease", "diseases", "treatment", "treatments", "therapy", "therapies",
    "diagnosis", "diagnostic", "diagnostics", "vaccine", "vaccination", "biotechnology", "biotech",
    "genomics", "proteomics", "transcriptomics", "metabolomics", "drug discovery", "drug design",
    "drug screening", "compound library", "target validation", "assay", "high-throughput screening",
    "lead optimization", "admet", "toxicity", "toxicology", "efficacy", "pharmacology",
    "pharmacokinetics", "pharmacodynamics", "therapeutics", "hospital", "hospitals", "clinical trial",
    "preclinical", "molecular docking", "qsar", "structure-activity relationship", "bioavailability",
    "ligand", "protein", "receptor", "enzyme", "biomarker", "rna", "dna", "mutagenesis",
    "cell line", "animal model", "in vitro", "in vivo", "in silico", "pathway", "mechanism of action"
  ];
  const lowerQuery = query.toLowerCase();
  return keywords.some(kw => lowerQuery.includes(kw));
}
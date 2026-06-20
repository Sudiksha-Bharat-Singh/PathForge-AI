import os
import sys
import json
import argparse
import numpy as np

# Ensure scikit-learn is imported safely
try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
except ImportError:
    print(json.dumps({
        "error": "Missing scikit-learn dependency. Please ensure it is installed."
    }))
    sys.exit(1)

def parse_args():
    parser = argparse.ArgumentParser(description="PathForge AI Career Recommendation Engine")
    parser.add_argument(
        "--skills", 
        type=str, 
        help="Input skills as a comma-separated list or JSON array string"
    )
    return parser.parse_args()

def load_dataset():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(current_dir, "careers_dataset.json")
    
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"Careers dataset not found at: {dataset_path}")
        
    with open(dataset_path, "r", encoding="utf-8") as f:
        return json.load(f)

def clean_skills(skills_input):
    if not skills_input:
        return []
        
    skills_input = skills_input.strip()
    
    # Try parsing as JSON array
    try:
        parsed = json.loads(skills_input)
        if isinstance(parsed, list):
            return [str(s).strip() for s in parsed if str(s).strip()]
    except (json.JSONDecodeError, TypeError):
        pass
        
    # Fallback to comma-separated splitting
    return [s.strip() for s in skills_input.split(",") if s.strip()]

def get_recommendations(user_skills, careers):
    # Standardize input skills for set lookups
    user_skills_lower = {s.lower() for s in user_skills}
    
    # Handle the empty skills edge case gracefully
    if not user_skills:
        # If no skills are provided, return the first 5 careers with 0% similarity
        recommendations = []
        for role in careers[:5]:
            recommendations.append({
                "role": role["role"],
                "match_percentage": 0,
                "description": role["description"],
                "matched_skills": [],
                "missing_skills": role["skills"],
                "roadmap": role["roadmap"],
                "projects": role["projects"],
                "salary_range": role["salary_range"]
            })
        return recommendations

    # Prepare document text lists for TF-IDF. 
    # We join skills by comma to avoid splitting multi-word skills into separate tokens,
    # by using a custom comma-splitting tokenizer in the TfidfVectorizer.
    role_documents = [",".join(role["skills"]) for role in careers]
    user_document = ",".join(user_skills)

    # Initialize TF-IDF Vectorizer with custom comma-tokenizer to preserve multi-word skills
    def custom_tokenizer(text):
        return [s.strip().lower() for s in text.split(",") if s.strip()]

    vectorizer = TfidfVectorizer(tokenizer=custom_tokenizer, token_pattern=None, lowercase=False)
    
    # Fit on all documents (careers + user input) to handle out-of-vocabulary terms gracefully
    tfidf_matrix = vectorizer.fit_transform(role_documents + [user_document])
    
    role_vectors = tfidf_matrix[:-1]
    user_vector = tfidf_matrix[-1]
    
    # Compute Cosine Similarity between user vector and all career vectors
    similarities = cosine_similarity(user_vector, role_vectors)[0]
    
    recommendations = []
    
    for idx, similarity in enumerate(similarities):
        role = careers[idx]
        
        # Calculate matched and missing skills (preserving original casing from dataset)
        matched_skills = []
        missing_skills = []
        
        for skill in role["skills"]:
            if skill.lower() in user_skills_lower:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)
                
        # Convert similarity to percentage
        match_percentage = int(round(float(similarity) * 100))
        
        # Ensure that if they share at least one skill but score rounds to 0, 
        # we give a minimum score of 1% to reflect a positive match.
        if len(matched_skills) > 0 and match_percentage == 0:
            match_percentage = 1
            
        recommendations.append({
            "role": role["role"],
            "match_percentage": match_percentage,
            "description": role["description"],
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "roadmap": role["roadmap"],
            "projects": role["projects"],
            "salary_range": role["salary_range"]
        })
        
    # Sort by match percentage in descending order
    # If match percentages are equal, sort by number of matched skills in descending order
    recommendations.sort(key=lambda x: (x["match_percentage"], len(x["matched_skills"])), reverse=True)
    
    # Return top 5 matches
    return recommendations[:5]

def main():
    try:
        args = parse_args()
        skills_input = args.skills
        
        # If not provided via CLI argument, try reading from stdin (e.g. piped input)
        if not skills_input and not sys.stdin.isatty():
            skills_input = sys.stdin.read().strip()
            
        if not skills_input:
            print(json.dumps({
                "error": "No skills input provided. Use --skills or pipe input."
            }, indent=2))
            sys.exit(1)
            
        careers = load_dataset()
        user_skills = clean_skills(skills_input)
        
        top_recommendations = get_recommendations(user_skills, careers)
        
        if not top_recommendations:
            print(json.dumps({
                "error": "Failed to generate recommendations."
            }, indent=2))
            sys.exit(1)
            
        # Format the final JSON response
        output = {
            "top_match": top_recommendations[0],
            "alternative_matches": top_recommendations[1:]
        }
        
        print(json.dumps(output, indent=2))
        sys.exit(0)
        
    except Exception as e:
        print(json.dumps({
            "error": f"An unexpected error occurred: {str(e)}"
        }, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()

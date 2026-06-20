
import sys
import os

# Adjust path to import from backend
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from recommend import load_dataset, get_recommendations

def run_tests():
    print("Starting Recommendation Engine Tests...\n" + "="*50)
    
    try:
        careers = load_dataset()
    except Exception as e:
        print(f"Error loading dataset: {e}")
        sys.exit(1)
        
    test_cases = [
        {
            "name": "Data Science / ML Profile",
            "skills": ["Python", "SQL", "Machine Learning"],
            "expected_top": ["Data Scientist", "Machine Learning Engineer"]
        },
        {
            "name": "Frontend Web Profile",
            "skills": ["React", "JavaScript", "CSS"],
            "expected_top": ["Frontend Developer", "Full Stack Developer", "UI/UX Engineer"]
        },
        {
            "name": "DevOps / Infrastructure Profile",
            "skills": ["AWS", "Docker", "Linux"],
            "expected_top": ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer (SRE)", "Security Engineer"]
        },
        {
            "name": "Cybersecurity Profile",
            "skills": ["Network Security", "Security Audits", "Linux"], # Match skills exactly or closely
            "expected_top": ["Cybersecurity Analyst", "Security Engineer"]
        }
    ]
    
    passed = 0
    for idx, tc in enumerate(test_cases):
        print(f"\nTest Case {idx + 1}: {tc['name']}")
        print(f"Input Skills: {tc['skills']}")
        
        recs = get_recommendations(tc["skills"], careers)
        
        if not recs:
            print("  [FAILED] No recommendations returned.")
            continue
            
        top_match = recs[0]
        print(f"Top Match: {top_match['role']} ({top_match['match_percentage']}% Match)")
        print(f"  Matched Skills: {top_match['matched_skills']}")
        print(f"  Missing Skills Count: {len(top_match['missing_skills'])}")
        
        # Verify structure
        required_keys = {
            "role", "match_percentage", "description", 
            "matched_skills", "missing_skills", "roadmap", 
            "projects", "salary_range"
        }
        missing_keys = required_keys - set(top_match.keys())
        if missing_keys:
            print(f"  [FAILED] Missing fields in recommendation output: {missing_keys}")
            continue
            
        # Verify top match is reasonable
        is_reasonable = False
        for expected in tc["expected_top"]:
            if expected.lower() in top_match["role"].lower():
                is_reasonable = True
                break
                
        if is_reasonable:
            print(f"  [PASSED] Top match matches expectations: {tc['expected_top']}")
            passed += 1
        else:
            print(f"  [FAILED] Expected one of {tc['expected_top']}, but got {top_match['role']}")
            
    print("\n" + "="*50)
    print(f"Test Summary: {passed}/{len(test_cases)} tests passed.")
    
    if passed == len(test_cases):
        print("All tests passed successfully!")
        sys.exit(0)
    else:
        print("Some tests failed.")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()

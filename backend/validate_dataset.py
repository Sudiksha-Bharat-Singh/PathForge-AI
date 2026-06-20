import json
import os
import sys

def validate_dataset(filepath):
    print(f"Validating dataset file: {filepath}")
    
    if not os.path.exists(filepath):
        print(f"Error: File does not exist at {filepath}")
        sys.exit(1)
        
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse JSON. Details: {e}")
        sys.exit(1)
        
    if not isinstance(data, list):
        print("Error: Root element of the dataset must be a JSON array (list).")
        sys.exit(1)
        
    role_count = len(data)
    print(f"Found {role_count} career roles in the dataset.")
    
    if role_count < 25:
        print(f"Error: Dataset must contain at least 25 roles. Found only {role_count}.")
        sys.exit(1)
        
    errors = 0
    required_keys = {"role", "description", "skills", "roadmap", "projects", "salary_range"}
    salary_keys = {"min", "max", "average"}
    project_keys = {"name", "description", "difficulty"}
    
    roles_seen = set()
    
    for index, item in enumerate(data):
        role_name = item.get("role", f"<Unknown Role at index {index}>")
        print(f"Checking role: {role_name}...")
        
        # Check for duplicates
        if role_name in roles_seen:
            print(f"  - Error: Duplicate role name found: {role_name}")
            errors += 1
        roles_seen.add(role_name)
        
        # Check keys
        keys_present = set(item.keys())
        missing_keys = required_keys - keys_present
        if missing_keys:
            print(f"  - Error: Missing required keys: {missing_keys}")
            errors += 1
            continue
            
        # Validate fields
        if not isinstance(item["role"], str) or not item["role"].strip():
            print("  - Error: 'role' must be a non-empty string.")
            errors += 1
            
        if not isinstance(item["description"], str) or not item["description"].strip():
            print("  - Error: 'description' must be a non-empty string.")
            errors += 1
            
        if not isinstance(item["skills"], list) or not all(isinstance(s, str) for s in item["skills"]):
            print("  - Error: 'skills' must be a list of strings.")
            errors += 1
        elif len(item["skills"]) == 0:
            print("  - Error: 'skills' list cannot be empty.")
            errors += 1
            
        if not isinstance(item["roadmap"], list) or not all(isinstance(r, str) for r in item["roadmap"]):
            print("  - Error: 'roadmap' must be a list of strings.")
            errors += 1
        elif len(item["roadmap"]) == 0:
            print("  - Error: 'roadmap' list cannot be empty.")
            errors += 1
            
        # Validate salary range
        salary = item["salary_range"]
        if not isinstance(salary, dict):
            print("  - Error: 'salary_range' must be a dictionary.")
            errors += 1
        else:
            missing_salary_keys = salary_keys - set(salary.keys())
            if missing_salary_keys:
                print(f"  - Error: 'salary_range' is missing keys: {missing_salary_keys}")
                errors += 1
            else:
                for k in salary_keys:
                    if not isinstance(salary[k], str) or not salary[k].strip():
                        print(f"  - Error: salary_range key '{k}' must be a non-empty string.")
                        errors += 1
                        
        # Validate projects
        projects = item["projects"]
        if not isinstance(projects, list):
            print("  - Error: 'projects' must be a list.")
            errors += 1
        elif len(projects) == 0:
            print("  - Error: 'projects' list cannot be empty.")
            errors += 1
        else:
            for p_idx, p in enumerate(projects):
                if not isinstance(p, dict):
                    print(f"  - Error: Project at index {p_idx} must be a dictionary.")
                    errors += 1
                    continue
                missing_p_keys = project_keys - set(p.keys())
                if missing_p_keys:
                    print(f"  - Error: Project at index {p_idx} is missing keys: {missing_p_keys}")
                    errors += 1
                else:
                    if not isinstance(p["name"], str) or not p["name"].strip():
                        print(f"  - Error: Project name at index {p_idx} must be a non-empty string.")
                        errors += 1
                    if not isinstance(p["description"], str) or not p["description"].strip():
                        print(f"  - Error: Project description at index {p_idx} must be a non-empty string.")
                        errors += 1
                    if not isinstance(p["difficulty"], str) or not p["difficulty"].strip():
                        print(f"  - Error: Project difficulty at index {p_idx} must be a non-empty string.")
                        errors += 1

    if errors > 0:
        print(f"\nValidation failed with {errors} error(s).")
        sys.exit(1)
    else:
        print("\nSuccess! Dataset is valid and matches the specified schema.")
        sys.exit(0)

if __name__ == "__main__":
    dataset_path = os.path.join(os.path.dirname(__file__), "careers_dataset.json")
    validate_dataset(dataset_path)

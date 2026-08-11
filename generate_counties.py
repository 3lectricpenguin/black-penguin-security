import os
import glob
import re

all_mi_counties = [
    "Alcona", "Alger", "Allegan", "Alpena", "Antrim", "Arenac", "Baraga", "Barry", "Bay", "Benzie", 
    "Berrien", "Branch", "Calhoun", "Cass", "Charlevoix", "Cheboygan", "Chippewa", "Clare", "Clinton", 
    "Crawford", "Delta", "Dickinson", "Eaton", "Emmet", "Genesee", "Gladwin", "Gogebic", "Grand Traverse", 
    "Gratiot", "Hillsdale", "Houghton", "Huron", "Ingham", "Ionia", "Iosco", "Iron", "Isabella", "Jackson", 
    "Kalamazoo", "Kalkaska", "Kent", "Keweenaw", "Lake", "Lapeer", "Leelanau", "Lenawee", "Livingston", 
    "Luce", "Mackinac", "Macomb", "Manistee", "Marquette", "Mason", "Mecosta", "Menominee", "Midland", 
    "Missaukee", "Monroe", "Montcalm", "Montmorency", "Muskegon", "Newaygo", "Oakland", "Oceana", "Ogemaw", 
    "Ontonagon", "Osceola", "Oscoda", "Otsego", "Ottawa", "Presque Isle", "Roscommon", "Saginaw", "Sanilac", 
    "Schoolcraft", "Shiawassee", "St. Clair", "St. Joseph", "Tuscola", "Van Buren", "Washtenaw", "Wayne", "Wexford"
]

existing_mi_counties = [
    "Branch", "Hillsdale", "Jackson", "Lenawee", "Livingston", "Macomb", "Midland", "Monroe", 
    "Oakland", "Saginaw", "Washtenaw", "Wayne"
]

missing_counties = [c for c in all_mi_counties if c not in existing_mi_counties]

template_path = "branch-county-mi.html"
with open(template_path, "r", encoding="utf-8") as f:
    template_content = f.read()

# Make the template generic
template_content = re.sub(r'Branch County', '{COUNTY} County', template_content)
template_content = re.sub(r'Branch, MI', '{COUNTY}, MI', template_content)
template_content = re.sub(r'Coldwater, MI', '{COUNTY}, MI', template_content)
template_content = re.sub(r'Coldwater', '{COUNTY}', template_content)
template_content = re.sub(r'branch-county-mi\.html', '{COUNTY_SLUG}-county-mi.html', template_content)
template_content = re.sub(r'<title>.*?\|', '<title>{COUNTY} County Bail Bonds |', template_content)
template_content = re.sub(r'517-279-8899', '1-866-322-2245', template_content)
template_content = re.sub(r'989-772-4400', '1-866-322-2245', template_content) # Just in case

# Generate missing county files
for county in missing_counties:
    slug = county.lower().replace(" ", "-").replace(".", "")
    content = template_content.replace("{COUNTY}", county).replace("{COUNTY_SLUG}", slug)
    
    # Write new file
    with open(f"{slug}-county-mi.html", "w", encoding="utf-8") as f:
        f.write(content)

# Now, update the navigation in all files
html_files = glob.glob("*.html")
dropdown_html = ""
for county in sorted(all_mi_counties):
    slug = county.lower().replace(" ", "-").replace(".", "")
    dropdown_html += f'''                    <li>
                      <a href="{slug}-county-mi.html" class="dropdown-item featured-link">
                        <span>{county} County</span>
                      </a>
                    </li>\n'''

for file in html_files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace MI dropdown
    # We find the start of Ohio Counties and replace everything from `<div class="dropdown-col-heading">...Michigan Counties` down to `</ul>` before Ohio.
    # Actually, let's use regex to replace the ul content for Michigan Counties.
    
    pattern = r'(Michigan Counties\s*</div>\s*<ul class="dropdown-list">)(.*?)(</ul>\s*</div>\s*<div class="dropdown-col">)'
    content = re.sub(pattern, r'\1\n' + dropdown_html + r'                  \3', content, flags=re.DOTALL)
    
    # Remove payment plans mentions globally
    content = re.sub(r'<li><a href="[^"]+" class="footer-link">Flexible Payment Plans</a></li>', '', content)
    content = re.sub(r'flexible payment plans,\s*', '', content, flags=re.IGNORECASE)
    content = re.sub(r'flexible payment plans', '', content, flags=re.IGNORECASE)
    content = re.sub(r', and customized payment plans', '', content, flags=re.IGNORECASE)
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("Generated files and updated navigation!")

import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We need to change the media query in style.css for max-width: 768px

# First, replace the horizontal scroll styles with stacking styles
css = re.sub(
    r'\.digital-application-form \.wizard-step > div\[style\*\="margin-bottom: 30px"\]\s*{\s*overflow-x: auto;\s*-webkit-overflow-scrolling: touch;\s*width: 100%;\s*}',
    '',
    css
)

css = re.sub(
    r'\.digital-application-form div\[style\*\="grid-template-columns: 2fr 1fr 1fr 1fr 1fr"\],\s*\.digital-application-form div\[style\*\="grid-template-columns: 1fr 3fr 2fr 1\.5fr"\],\s*\.digital-application-form div\[style\*\="grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr"\]\s*{\s*min-width: 600px;\s*}',
    r'''  .digital-application-form div[style*="grid-template-columns: 2fr 1fr 1fr 1fr 1fr"],
  .digital-application-form div[style*="grid-template-columns: 1fr 3fr 2fr 1.5fr"],
  .digital-application-form div[style*="grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr"],
  .digital-application-form div[style*="grid-template-columns: 3fr 1fr"] {
    grid-template-columns: 1fr !important;
    gap: 15px !important;
  }
  
  /* Hide headers on mobile because we will use placeholders */
  .mobile-header-row {
    display: none !important;
  }
''',
    css
)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('application.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add placeholders to existing inputs
html = html.replace('name="Offense_1"', 'name="Offense_1" placeholder="Offense"')
html = html.replace('name="Case_1"', 'name="Case_1" placeholder="Case #"')
html = html.replace('name="Power_1"', 'name="Power_1" placeholder="Power #"')
html = html.replace('name="Amount_1"', 'name="Amount_1" placeholder="Amount"')
html = html.replace('name="Premium_1"', 'name="Premium_1" placeholder="Premium"')

html = html.replace('name="Child1_Age"', 'name="Child1_Age" placeholder="Age"')
html = html.replace('name="Child1_NameAddress"', 'name="Child1_NameAddress" placeholder="Child\'s Name/Address"')
html = html.replace('name="Child1_SchoolEmp"', 'name="Child1_SchoolEmp" placeholder="School/Employer"')
html = html.replace('name="Child1_Phone"', 'name="Child1_Phone" placeholder="Phone"')

# Auto fields
html = html.replace('name="Auto_Year"', 'name="Auto_Year" placeholder="Year"')
html = html.replace('name="Auto_Make"', 'name="Auto_Make" placeholder="Make"')
html = html.replace('name="Auto_Model"', 'name="Auto_Model" placeholder="Model"')
html = html.replace('name="Auto_Color"', 'name="Auto_Color" placeholder="Color"')
html = html.replace('name="Auto_Tag"', 'name="Auto_Tag" placeholder="Tag#"')
html = html.replace('name="Auto_State"', 'name="Auto_State" placeholder="State"')

# Drivers License
html = html.replace('name="Drivers_Lic"', 'name="Drivers_Lic" placeholder="Driver\'s Lic."')
html = html.replace('name="DL_State"', 'name="DL_State" placeholder="State"')
html = html.replace('name="DL_Exp"', 'name="DL_Exp" placeholder="Exp"')

# Indemnitors (1, 2, 3) grids
for i in range(1, 4):
    html = html.replace(f'name="Indemnitor{i}_DriversLic"', f'name="Indemnitor{i}_DriversLic" placeholder="Driver\'s Lic."')
    html = html.replace(f'name="Indemnitor{i}_SSN"', f'name="Indemnitor{i}_SSN" placeholder="SSN"')
    html = html.replace(f'name="Indemnitor{i}_DOB"', f'name="Indemnitor{i}_DOB" placeholder="DOB"')
    html = html.replace(f'name="Indemnitor{i}_City"', f'name="Indemnitor{i}_City" placeholder="City"')
    html = html.replace(f'name="Indemnitor{i}_Zip"', f'name="Indemnitor{i}_Zip" placeholder="Zip"')

# Add class to header rows
html = html.replace(
    '<div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 600;">\n                <div>Offense</div>',
    '<div class="mobile-header-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 600;">\n                <div>Offense</div>'
)
html = html.replace(
    '<div style="display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 600;">\n                <div>Age</div>',
    '<div class="mobile-header-row" style="display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 600;">\n                <div>Age</div>'
)

# Also update the JS script that adds new rows so they have placeholders too
js_replacement = """                  <input type="text" name="Offense_${offenseCount}" placeholder="Offense" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Case_${offenseCount}" placeholder="Case #" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Power_${offenseCount}" placeholder="Power #" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Amount_${offenseCount}" placeholder="Amount" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Premium_${offenseCount}" placeholder="Premium" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">"""

html = re.sub(r'<input type="text" name="Offense_\$\{offenseCount\}".*?Premium_\$\{offenseCount\}".*?>', js_replacement, html, flags=re.DOTALL)

js_child_replacement = """                  <input type="text" name="Child${childCount}_Age" placeholder="Age" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child${childCount}_NameAddress" placeholder="Child's Name/Address" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child${childCount}_SchoolEmp" placeholder="School/Employer" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child${childCount}_Phone" placeholder="Phone" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">"""

html = re.sub(r'<input type="text" name="Child\$\{childCount\}_Age".*?Child\$\{childCount\}_Phone".*?>', js_child_replacement, html, flags=re.DOTALL)

with open('application.html', 'w', encoding='utf-8') as f:
    f.write(html)

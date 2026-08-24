const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// Replace horizontal scrolling rule
css = css.replace(/\.digital-application-form \.wizard-step > div\[style\*\="margin-bottom: 30px"\]\s*\{[\s\S]*?\}/, '');

// Replace the grids with 1fr
const cssGrids = `  .digital-application-form div[style*="grid-template-columns: 2fr 1fr 1fr 1fr 1fr"],
  .digital-application-form div[style*="grid-template-columns: 1fr 3fr 2fr 1.5fr"],
  .digital-application-form div[style*="grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr"],
  .digital-application-form div[style*="grid-template-columns: 3fr 1fr"],
  .digital-application-form .offense-row,
  .digital-application-form .child-row {
    grid-template-columns: 1fr !important;
    gap: 10px !important;
  }
  
  /* Hide headers on mobile because we will use placeholders */
  .mobile-header-row {
    display: none !important;
  }`;

css = css.replace(/\.digital-application-form div\[style\*\="grid-template-columns: 2fr 1fr 1fr 1fr 1fr"\],[\s\S]*?min-width: 600px;\s*\}/, cssGrids);

fs.writeFileSync('style.css', css, 'utf-8');


let html = fs.readFileSync('application.html', 'utf-8');

// Add placeholders
html = html.replace('name="Offense_1"', 'name="Offense_1" placeholder="Offense"');
html = html.replace('name="Case_1"', 'name="Case_1" placeholder="Case #"');
html = html.replace('name="Power_1"', 'name="Power_1" placeholder="Power #"');
html = html.replace('name="Amount_1"', 'name="Amount_1" placeholder="Amount"');
html = html.replace('name="Premium_1"', 'name="Premium_1" placeholder="Premium"');

html = html.replace('name="Child1_Age"', 'name="Child1_Age" placeholder="Age"');
html = html.replace('name="Child1_NameAddress"', 'name="Child1_NameAddress" placeholder="Child\'s Name/Address"');
html = html.replace('name="Child1_SchoolEmp"', 'name="Child1_SchoolEmp" placeholder="School/Employer"');
html = html.replace('name="Child1_Phone"', 'name="Child1_Phone" placeholder="Phone"');

// Auto fields
html = html.replace('name="Auto_Year"', 'name="Auto_Year" placeholder="Year"');
html = html.replace('name="Auto_Make"', 'name="Auto_Make" placeholder="Make"');
html = html.replace('name="Auto_Model"', 'name="Auto_Model" placeholder="Model"');
html = html.replace('name="Auto_Color"', 'name="Auto_Color" placeholder="Color"');
html = html.replace('name="Auto_Tag"', 'name="Auto_Tag" placeholder="Tag#"');
html = html.replace('name="Auto_State"', 'name="Auto_State" placeholder="State"');

// Drivers License
html = html.replace('name="Drivers_Lic"', 'name="Drivers_Lic" placeholder="Driver\'s Lic."');
html = html.replace('name="DL_State"', 'name="DL_State" placeholder="State"');
html = html.replace('name="DL_Exp"', 'name="DL_Exp" placeholder="Exp"');

// Indemnitors (1, 2, 3) grids
for (let i = 1; i <= 3; i++) {
    html = html.replace(`name="Indemnitor${i}_DriversLic"`, `name="Indemnitor${i}_DriversLic" placeholder="Driver's Lic."`);
    html = html.replace(`name="Indemnitor${i}_SSN"`, `name="Indemnitor${i}_SSN" placeholder="SSN"`);
    html = html.replace(`name="Indemnitor${i}_DOB"`, `name="Indemnitor${i}_DOB" placeholder="DOB"`);
    html = html.replace(`name="Indemnitor${i}_City"`, `name="Indemnitor${i}_City" placeholder="City"`);
    html = html.replace(`name="Indemnitor${i}_Zip"`, `name="Indemnitor${i}_Zip" placeholder="Zip"`);
}

// Add class to header rows
html = html.replace(
    '<div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 600;">\n                <div>Offense</div>',
    '<div class="mobile-header-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 600;">\n                <div>Offense</div>'
);
html = html.replace(
    '<div style="display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 600;">\n                <div>Age</div>',
    '<div class="mobile-header-row" style="display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px; font-size: 0.85rem; font-weight: 600;">\n                <div>Age</div>'
);

// Also update the JS script that adds new rows so they have placeholders too
const js_replacement = `                  <input type="text" name="Offense_\${offenseCount}" placeholder="Offense" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Case_\${offenseCount}" placeholder="Case #" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Power_\${offenseCount}" placeholder="Power #" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Amount_\${offenseCount}" placeholder="Amount" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Premium_\${offenseCount}" placeholder="Premium" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">`;

html = html.replace(/<input type="text" name="Offense_\$\{offenseCount\}".*?Premium_\$\{offenseCount\}".*?>/s, js_replacement);

const js_child_replacement = `                  <input type="text" name="Child\${childCount}_Age" placeholder="Age" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child\${childCount}_NameAddress" placeholder="Child's Name/Address" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child\${childCount}_SchoolEmp" placeholder="School/Employer" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child\${childCount}_Phone" placeholder="Phone" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">`;

html = html.replace(/<input type="text" name="Child\$\{childCount\}_Age".*?Child\$\{childCount\}_Phone".*?>/s, js_child_replacement);

fs.writeFileSync('application.html', html, 'utf-8');
console.log("Modified files for mobile stacking successfully");

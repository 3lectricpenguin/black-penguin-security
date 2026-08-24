const fs = require('fs');
let content = fs.readFileSync('application.html', 'utf-8');

// Replace Offenses
const offensesOld = `              <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                <input type="text" name="Offense_2" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Case_2" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Power_2" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Amount_2" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Premium_2" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
              </div>
              <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                <input type="text" name="Offense_3" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Case_3" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Power_3" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Amount_3" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Premium_3" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
              </div>
              <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                <input type="text" name="Offense_4" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Case_4" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Power_4" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Amount_4" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Premium_4" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
              </div>`;

const offensesContainer = `              <div id="offenses-container">
                <div class="offense-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                  <input type="text" name="Offense_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Case_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Power_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Amount_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Premium_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                </div>
              </div>
              <button type="button" id="addOffenseBtn" style="padding: 6px 12px; margin-top: 5px; background: var(--color-slate-200); border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; color: var(--color-slate-700);">+ Add Offense</button>`;

content = content.replace(offensesOld, '');
content = content.replace(`              <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                <input type="text" name="Offense_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Case_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Power_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Amount_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Premium_1" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
              </div>`, offensesContainer);


// Replace Children
const childrenOld = `              <div style="display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px;">
                <input type="text" name="Child2_Age" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child2_NameAddress" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child2_SchoolEmp" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child2_Phone" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px;">
                <input type="text" name="Child3_Age" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child3_NameAddress" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child3_SchoolEmp" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child3_Phone" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
              </div>`;

const childrenContainer = `              <div id="children-container">
                <div class="child-row" style="display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px;">
                  <input type="text" name="Child1_Age" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child1_NameAddress" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child1_SchoolEmp" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child1_Phone" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                </div>
              </div>
              <button type="button" id="addChildBtn" style="padding: 6px 12px; margin-top: 5px; background: var(--color-slate-200); border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; color: var(--color-slate-700);">+ Add Child</button>`;

content = content.replace(childrenOld, '');
content = content.replace(`              <div style="display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px;">
                <input type="text" name="Child1_Age" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child1_NameAddress" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child1_SchoolEmp" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                <input type="text" name="Child1_Phone" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
              </div>`, childrenContainer);


// Dynamic row script
const addRowScript = `
        let offenseCount = 1;
        const addOffenseBtn = document.getElementById("addOffenseBtn");
        if(addOffenseBtn) {
            addOffenseBtn.addEventListener("click", () => {
                offenseCount++;
                const container = document.getElementById("offenses-container");
                const row = document.createElement("div");
                row.className = "offense-row";
                row.style.cssText = "display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;";
                row.innerHTML = \`
                  <input type="text" name="Offense_\${offenseCount}" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Case_\${offenseCount}" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Power_\${offenseCount}" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Amount_\${offenseCount}" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Premium_\${offenseCount}" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                \`;
                container.appendChild(row);
            });
        }

        let childCount = 1;
        const addChildBtn = document.getElementById("addChildBtn");
        if(addChildBtn) {
            addChildBtn.addEventListener("click", () => {
                childCount++;
                const container = document.getElementById("children-container");
                const row = document.createElement("div");
                row.className = "child-row";
                row.style.cssText = "display: grid; grid-template-columns: 1fr 3fr 2fr 1.5fr; gap: 10px; margin-bottom: 10px;";
                row.innerHTML = \`
                  <input type="text" name="Child\${childCount}_Age" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child\${childCount}_NameAddress" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child\${childCount}_SchoolEmp" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                  <input type="text" name="Child\${childCount}_Phone" style="padding: 8px; border: 1px solid var(--color-slate-300); border-radius: 4px;">
                \`;
                container.appendChild(row);
            });
        }
`;

// Insert the dynamic row script before the end of the DOMContentLoaded block
content = content.replace('    });\n</script>', addRowScript + '\n    });\n</script>');

fs.writeFileSync('application.html', content, 'utf-8');
console.log("Modified dynamic rows successfully");

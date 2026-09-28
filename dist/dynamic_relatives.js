const fs = require('fs');
let html = fs.readFileSync('application.html', 'utf-8');

// The current table has 10 rows. We need to replace it with 3 rows and an add button.
const oldTbody = `                  <tbody>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_1_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_1_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_1_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_1_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_2_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_2_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_2_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_2_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_3_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_3_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_3_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_3_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_4_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_4_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_4_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_4_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_5_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_5_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_5_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_5_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_6_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_6_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_6_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_6_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_7_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_7_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_7_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_7_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_8_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_8_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_8_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_8_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_9_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_9_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_9_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_9_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_10_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_10_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_10_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_10_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                  </tbody>
              </table>
            </div>`;

const newTbody = `                  <tbody id="relatives-tbody">
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_1_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_1_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_1_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_1_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_2_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_2_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_2_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_2_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_3_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_3_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_3_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_3_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>
                  </tbody>
              </table>
              <button type="button" id="addRelativeBtn" style="padding: 6px 12px; margin-top: 5px; background: var(--color-slate-200); border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; color: var(--color-slate-700);">+ Add Relative</button>
            </div>`;

html = html.replace(oldTbody, newTbody);

const addRelativeScript = `
        let relativeCount = 3;
        const addRelativeBtn = document.getElementById("addRelativeBtn");
        if(addRelativeBtn) {
            addRelativeBtn.addEventListener("click", () => {
                relativeCount++;
                const tbody = document.getElementById("relatives-tbody");
                const tr = document.createElement("tr");
                tr.innerHTML = \`
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_\${relativeCount}_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_\${relativeCount}_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_\${relativeCount}_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_\${relativeCount}_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                \`;
                tbody.appendChild(tr);
            });
        }
`;

html = html.replace('    });\n</script>', addRelativeScript + '\n    });\n</script>');

fs.writeFileSync('application.html', html, 'utf-8');
console.log("Updated relative rows");

const fs = require('fs');

let html = fs.readFileSync('application.html', 'utf-8');

const oldTbody = `                  <tbody>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">Mother</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Mother_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Mother_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Mother_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">Father</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Father_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Father_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Father_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">Brother</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Bro1_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Bro1_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Bro1_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">Brother</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Bro2_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Bro2_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Bro2_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">Sister</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Sis1_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Sis1_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Sis1_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">Sister</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Sis2_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Sis2_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_Sis2_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">M-Law</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_MLaw_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_MLaw_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_MLaw_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">F-Law</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_FLaw_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_FLaw_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_FLaw_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">Gr. Parents</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_GrParents_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_GrParents_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_GrParents_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);">Ex Spouse</td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_ExSpouse_Name" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_ExSpouse_Address" style="width: 100%; border: none;"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_ExSpouse_Phone" style="width: 100%; border: none;"></td>
                      </tr>
                  </tbody>`;

let newTbody = '                  <tbody>\n';
for (let i = 1; i <= 10; i++) {
    newTbody += `                      <tr>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_${i}_Type" style="width: 100%; border: none;" placeholder="Relation"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_${i}_Name" style="width: 100%; border: none;" placeholder="Name"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_${i}_Address" style="width: 100%; border: none;" placeholder="Address, City, State, Zip"></td>
                          <td style="padding: 8px; border: 1px solid var(--color-slate-300);"><input type="text" name="Rel_${i}_Phone" style="width: 100%; border: none;" placeholder="Phone"></td>
                      </tr>\n`;
}
newTbody += '                  </tbody>';

html = html.replace(oldTbody, newTbody);

fs.writeFileSync('application.html', html, 'utf-8');
console.log("Replaced relatives table successfully.");

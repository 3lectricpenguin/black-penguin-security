$AllMiCounties = @(
    "Alcona", "Alger", "Allegan", "Alpena", "Antrim", "Arenac", "Baraga", "Barry", "Bay", "Benzie", 
    "Berrien", "Branch", "Calhoun", "Cass", "Charlevoix", "Cheboygan", "Chippewa", "Clare", "Clinton", 
    "Crawford", "Delta", "Dickinson", "Eaton", "Emmet", "Genesee", "Gladwin", "Gogebic", "Grand Traverse", 
    "Gratiot", "Hillsdale", "Houghton", "Huron", "Ingham", "Ionia", "Iosco", "Iron", "Isabella", "Jackson", 
    "Kalamazoo", "Kalkaska", "Kent", "Keweenaw", "Lake", "Lapeer", "Leelanau", "Lenawee", "Livingston", 
    "Luce", "Mackinac", "Macomb", "Manistee", "Marquette", "Mason", "Mecosta", "Menominee", "Midland", 
    "Missaukee", "Monroe", "Montcalm", "Montmorency", "Muskegon", "Newaygo", "Oakland", "Oceana", "Ogemaw", 
    "Ontonagon", "Osceola", "Oscoda", "Otsego", "Ottawa", "Presque Isle", "Roscommon", "Saginaw", "Sanilac", 
    "Schoolcraft", "Shiawassee", "St. Clair", "St. Joseph", "Tuscola", "Van Buren", "Washtenaw", "Wayne", "Wexford"
)
$ExistingMiCounties = @(
    "Branch", "Hillsdale", "Jackson", "Lenawee", "Livingston", "Macomb", "Midland", "Monroe", 
    "Oakland", "Saginaw", "Washtenaw", "Wayne"
)

$MissingCounties = $AllMiCounties | Where-Object { $_ -notin $ExistingMiCounties }

$CardsHtml = ""
foreach ($county in $MissingCounties) {
    $slug = $county.ToLower().Replace(" ", "-").Replace(".", "")
    $CardsHtml += @"

          <!-- $county County Card (Michigan) -->
          <div class="county-card" id="$slug-county" data-state="Michigan" style="border-top: 4px solid var(--color-blue-500);">
            <div>
              <div class="county-card-header">
                <div>
                  <h3>$county County</h3>
                  <div class="county-seat">$county, MI</div>
                </div>
              </div>
              <ul class="county-meta">
                <li><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg> $county County Jail</li>
                <li><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg> District &amp; Circuit Courts</li>
                <li><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg> 24/7 Dispatch &amp; Phone Approvals</li>
              </ul>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <a href="$slug-county-mi.html" class="btn btn-primary" style="width: 100%; text-align: center;">View $county County Page →</a>
              <a href="tel:1-866-322-2245" class="btn btn-emergency" style="width: 100%; text-align: center; font-size: 0.9rem; padding: 10px 16px;">Toll-Free: 1-866-322-2245</a>
            </div>
          </div>
"@
}

$LocContent = Get-Content locations.html -Raw
$LocContent = $LocContent -replace '(?s)(<!-- FULL COUNTY DIRECTORY GRID -->.*?<div class="county-card-grid">.*?)(</div>\s*</div>\s*</section>)', ("`$1" + $CardsHtml + "`n        `$2")
Set-Content locations.html -Value $LocContent -NoNewline
Write-Host "Locations updated."

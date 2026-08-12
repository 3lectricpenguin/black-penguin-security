$AllOhCounties = @(
    "Adams", "Allen", "Ashland", "Ashtabula", "Athens", "Auglaize", "Belmont", "Brown", "Butler", "Carroll", 
    "Champaign", "Clark", "Clermont", "Clinton", "Columbiana", "Coshocton", "Crawford", "Cuyahoga", "Darke", 
    "Defiance", "Delaware", "Erie", "Fairfield", "Fayette", "Franklin", "Fulton", "Gallia", "Geauga", "Greene", 
    "Guernsey", "Hamilton", "Hancock", "Hardin", "Harrison", "Henry", "Highland", "Hocking", "Holmes", "Huron", 
    "Jackson", "Jefferson", "Knox", "Lake", "Lawrence", "Licking", "Logan", "Lorain", "Lucas", "Madison", 
    "Mahoning", "Marion", "Medina", "Meigs", "Mercer", "Miami", "Monroe", "Montgomery", "Morgan", "Morrow", 
    "Muskingum", "Noble", "Ottawa", "Paulding", "Perry", "Pickaway", "Pike", "Portage", "Preble", "Putnam", 
    "Richland", "Ross", "Sandusky", "Scioto", "Seneca", "Shelby", "Stark", "Summit", "Trumbull", "Tuscarawas", 
    "Union", "Van Wert", "Vinton", "Warren", "Washington", "Wayne", "Williams", "Wood", "Wyandot"
)

$ExistingOhCounties = @(
    "Allen", "Erie", "Hancock", "Henry", "Lucas", "Ottawa", "Sandusky", "Seneca", "Wood"
)

$MissingCounties = $AllOhCounties | Where-Object { $_ -notin $ExistingOhCounties }

$TemplatePath = "wood-county-oh.html"
$TemplateContent = Get-Content $TemplatePath -Raw

# Make the template generic
$TemplateContent = $TemplateContent -replace 'Wood County', '{COUNTY} County'
$TemplateContent = $TemplateContent -replace 'Wood, OH', '{COUNTY}, OH'
$TemplateContent = $TemplateContent -replace 'Bowling Green, OH', '{COUNTY}, OH'
$TemplateContent = $TemplateContent -replace 'Bowling Green', '{COUNTY}'
$TemplateContent = $TemplateContent -replace 'wood-county-oh\.html', '{COUNTY_SLUG}-county-oh.html'
$TemplateContent = $TemplateContent -replace '(?i)<title>.*?\|', '<title>{COUNTY} County Bail Bonds |'
$TemplateContent = $TemplateContent -replace '419-352-5200', '1-866-322-2245'

# Also strip out payment plan stuff just in case it got left in
$TemplateContent = $TemplateContent -replace '(?s)<li>\s*<a href="[^"]+" class="footer-link">Flexible Payment Plans</a>\s*</li>', ''
$TemplateContent = $TemplateContent -replace '(?i)flexible payment plans,\s*', ''
$TemplateContent = $TemplateContent -replace '(?i)flexible payment plans', ''
$TemplateContent = $TemplateContent -replace '(?i),\s*and customized payment plans', ''

$CardsHtml = ""

foreach ($county in $MissingCounties) {
    $slug = $county.ToLower().Replace(" ", "-").Replace(".", "")
    $content = $TemplateContent.Replace("{COUNTY}", $county).Replace("{COUNTY_SLUG}", $slug)
    Set-Content "$slug-county-oh.html" -Value $content -NoNewline
    
    $CardsHtml += @"

          <!-- $county County Card (Ohio) -->
          <div class="county-card" id="$slug-county" data-state="Ohio" style="border-top: 4px solid var(--color-blue-500);">
            <div>
              <div class="county-card-header">
                <div>
                  <h3>$county County</h3>
                  <div class="county-seat">$county, OH</div>
                </div>
              </div>
              <ul class="county-meta">
                <li><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg> $county County Jail</li>
                <li><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg> Municipal &amp; Common Pleas Courts</li>
                <li><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg> 24/7 Dispatch &amp; Phone Approvals</li>
              </ul>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <a href="$slug-county-oh.html" class="btn btn-primary" style="width: 100%; text-align: center;">View $county County Page →</a>
              <a href="tel:1-866-322-2245" class="btn btn-emergency" style="width: 100%; text-align: center; font-size: 0.9rem; padding: 10px 16px;">Toll-Free: 1-866-322-2245</a>
            </div>
          </div>
"@
}

$LocContent = Get-Content locations.html -Raw
$LocContent = $LocContent -replace '(?s)(<!-- FULL COUNTY DIRECTORY GRID -->.*?<div class="county-card-grid">.*?)(</div>\s*</div>\s*</section>)', ("`$1" + $CardsHtml + "`n        `$2")
Set-Content locations.html -Value $LocContent -NoNewline

Write-Host "Generated OH counties and added to locations.html"

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

$TemplatePath = "branch-county-mi.html"
$TemplateContent = Get-Content $TemplatePath -Raw

# Make the template generic
$TemplateContent = $TemplateContent -replace 'Branch County', '{COUNTY} County'
$TemplateContent = $TemplateContent -replace 'Branch, MI', '{COUNTY}, MI'
$TemplateContent = $TemplateContent -replace 'Coldwater, MI', '{COUNTY}, MI'
$TemplateContent = $TemplateContent -replace 'Coldwater', '{COUNTY}'
$TemplateContent = $TemplateContent -replace 'branch-county-mi\.html', '{COUNTY_SLUG}-county-mi.html'
$TemplateContent = $TemplateContent -replace '(?i)<title>.*?\|', '<title>{COUNTY} County Bail Bonds |'
$TemplateContent = $TemplateContent -replace '517-279-8899', '1-866-322-2245'
$TemplateContent = $TemplateContent -replace '989-772-4400', '1-866-322-2245'

foreach ($county in $MissingCounties) {
    $slug = $county.ToLower().Replace(" ", "-").Replace(".", "")
    $content = $TemplateContent.Replace("{COUNTY}", $county).Replace("{COUNTY_SLUG}", $slug)
    Set-Content "$slug-county-mi.html" -Value $content -NoNewline
}

# Now, update the navigation in all files
$HtmlFiles = Get-ChildItem -Filter *.html
$DropdownHtml = ""
foreach ($county in ($AllMiCounties | Sort-Object)) {
    $slug = $county.ToLower().Replace(" ", "-").Replace(".", "")
    $DropdownHtml += "                    <li>`n                      <a href=`"$slug-county-mi.html`" class=`"dropdown-item featured-link`">`n                        <span>$county County</span>`n                      </a>`n                    </li>`n"
}

foreach ($file in $HtmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace MI dropdown
    $pattern = '(?s)(Michigan Counties\s*</div>\s*<ul class="dropdown-list">)(.*?)(</ul>\s*</div>\s*<div class="dropdown-col">)'
    $content = $content -replace $pattern, ("`$1`n" + $DropdownHtml + "                  `$3")
    
    # Remove payment plans mentions globally
    $content = $content -replace '(?s)<li>\s*<a href="[^"]+" class="footer-link">Flexible Payment Plans</a>\s*</li>', ''
    $content = $content -replace '(?i)flexible payment plans,\s*', ''
    $content = $content -replace '(?i)flexible payment plans', ''
    $content = $content -replace '(?i),\s*and customized payment plans', ''
    
    Set-Content $file.FullName -Value $content -NoNewline
}

Write-Host "Generated files and updated navigation!"

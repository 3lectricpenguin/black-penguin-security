$LocContent = Get-Content locations.html -Raw
if ($LocContent -match '(?s)(<div class="county-card-grid">)(.*?)(</div>\s*</div>\s*</section>)') {
    $GridStart = $matches[1]
    $GridContent = $matches[2]
    $GridEnd = $matches[3]

    # Split grid content by "<!-- " which precedes every county card (or `<div class="county-card"`).
    # Since some might not have comments, let's split by '<div class="county-card"' instead,
    # but keep the delimiter.
    
    $Cards = $GridContent -split '(?=<div class="county-card")' | Where-Object { $_.Trim() -ne '' }
    
    $ParsedCards = @()
    foreach ($card in $Cards) {
        $state = ""
        $countyName = ""
        if ($card -match 'data-state="([^"]+)"') { $state = $matches[1] }
        if ($card -match '<h3>([^<]+)</h3>') { $countyName = $matches[1].Replace(" County", "").Trim() }
        
        # Clean up any leading comments from the split if they got left behind in the previous block
        # Actually splitting by `<div class="county-card"` leaves comments in the PREVIOUS element.
        # It's better to extract using Regex.
    }
}

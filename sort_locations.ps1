$LocContent = Get-Content locations.html -Raw
if ($LocContent -match '(?s)(<div class="county-card-grid">)(.*?)(</div>\s*</div>\s*</section>)') {
    $GridStart = $matches[1]
    $GridContent = $matches[2]
    $GridEnd = $matches[3]

    $Cards = $GridContent -split '<!-- ' | Where-Object { $_.Trim() -ne '' }

    $ParsedCards = @()
    foreach ($card in $Cards) {
        $fullText = "<!-- " + $card
        $state = ""
        $countyName = ""
        
        # Try to parse state from data-state attribute first
        if ($fullText -match 'data-state="([^"]+)"') {
            $state = $matches[1]
        }
        
        # Try to parse county name from h3
        if ($fullText -match '<h3>([^<]+) County</h3>') {
            $countyName = $matches[1].Trim()
        } elseif ($fullText -match '<h3>([^<]+)</h3>') {
            $countyName = $matches[1].Replace(" County", "").Trim()
        }
        
        if ($state -eq "" -or $countyName -eq "") {
            Write-Host "Failed to parse: $fullText"
            continue
        }
        
        $ParsedCards += [PSCustomObject]@{
            State = $state
            County = $countyName
            Html = $fullText
        }
    }

    # Sort the cards
    $SortedCards = $ParsedCards | Sort-Object State, County

    # Reconstruct the HTML
    $NewGridHtml = "`n"
    
    $CurrentState = ""
    foreach ($card in $SortedCards) {
        if ($card.State -ne $CurrentState) {
            $CurrentState = $card.State
            # Add a visual separator or heading if needed? The user didn't ask for a heading inside the grid, they just said "re-ordered alphabetically, by state".
        }
        $NewGridHtml += $card.Html
    }

    $NewContent = $LocContent -replace '(?s)(<div class="county-card-grid">)(.*?)(</div>\s*</div>\s*</section>)', ("`$1" + $NewGridHtml + "`n        `$3")
    Set-Content locations.html -Value $NewContent -NoNewline
    Write-Host "Sorted locations!"
} else {
    Write-Host "Could not find grid."
}

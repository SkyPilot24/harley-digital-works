param([string]$SkillsRoot = (Join-Path $env:USERPROFILE '.codex/skills'), [switch]$Check)
$ErrorActionPreference = 'Stop'
$repositoryRoot = Split-Path $PSScriptRoot -Parent
$skillNames = @('thg-production-qa', 'thg-client-build-standard', 'thg-supabase-security')
$work = @()
foreach ($skillName in $skillNames) {
    $sourceRoot = Join-Path $repositoryRoot "skills/$skillName"
    $targetRoot = Join-Path $SkillsRoot $skillName
    $manifestPath = Join-Path $targetRoot '.thg-source.json'
    $prior = @{}
    if (Test-Path -LiteralPath $manifestPath) {
        $manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
        foreach ($entry in $manifest.files.PSObject.Properties) { $prior[$entry.Name] = $entry.Value }
    }
    foreach ($file in Get-ChildItem -LiteralPath $sourceRoot -File -Recurse) {
        $relative = $file.FullName.Substring($sourceRoot.Length).TrimStart('\', '/')
        $target = Join-Path $targetRoot $relative
        $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
        $targetHash = if (Test-Path -LiteralPath $target) { (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash } else { $null }
        if ($Check -and $hash -ne $targetHash) { throw "Installed skill differs or is missing: $skillName/$relative" }
        if ($targetHash -and $targetHash -ne $hash -and $prior[$relative] -ne $targetHash) { throw "Locally edited installed skill: $skillName/$relative. Reconcile before syncing." }
        $work += [pscustomobject]@{ Skill = $skillName; Relative = $relative; Source = $file.FullName; Target = $target; Hash = $hash }
    }
}
if (-not $Check) {
    foreach ($item in $work) {
        New-Item -ItemType Directory -Path (Split-Path $item.Target -Parent) -Force | Out-Null
        Copy-Item -LiteralPath $item.Source -Destination $item.Target
    }
    foreach ($skillName in $skillNames) {
        $hashes = [ordered]@{}
        foreach ($item in $work | Where-Object Skill -eq $skillName) { $hashes[$item.Relative] = $item.Hash }
        [ordered]@{ source = (Join-Path $repositoryRoot "skills/$skillName"); files = $hashes } | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $SkillsRoot "$skillName/.thg-source.json") -Encoding utf8
    }
}
Write-Output "All three Harley skills $(if ($Check) {'match their repository sources'} else {'synchronised'})."

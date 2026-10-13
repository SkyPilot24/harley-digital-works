<#
.SYNOPSIS
    Automated Chief of Staff Runner for The Harley Group
.DESCRIPTION
    Executes the Chief of Staff business snapshot collection and evaluation.
    Can be run manually or triggered by Windows Task Scheduler.
#>

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$chiefOfStaffHelper = "C:\Users\drrob\.codex\.chatgpt-projects\g-p-6821b09180c48191b13b8c6d60d6782b\output\chief-of-staff\briefings\briefing.mjs"
$logFile = "C:\Users\drrob\.codex\.chatgpt-projects\g-p-6821b09180c48191b13b8c6d60d6782b\output\chief-of-staff\briefings\runner.log"

$timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Add-Content -Path $logFile -Value "[$timestamp] Starting Chief of Staff run..."

try {
    # 1. Collect snapshot
    $collectOutput = node "$chiefOfStaffHelper" collect
    Add-Content -Path $logFile -Value "[$timestamp] Collected snapshot successfully."

    # 2. Evaluate state
    $evalOutput = node "$chiefOfStaffHelper" evaluate
    Add-Content -Path $logFile -Value "[$timestamp] Evaluated state: $evalOutput"

    # 3. Prepare publication
    $pubOutput = node "$chiefOfStaffHelper" prepare-publication
    Add-Content -Path $logFile -Value "[$timestamp] Publication prepared: $pubOutput"

    Add-Content -Path $logFile -Value "[$timestamp] Run completed successfully."
} catch {
    $err = $_.Exception.Message
    Add-Content -Path $logFile -Value "[$timestamp] ERROR: $err"
    Write-Error "Chief of Staff execution failed: $err"
}

param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('Setup', 'Start', 'Check', 'Build')]
  [string]$Action
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location -LiteralPath $projectRoot
$previousPreset = $env:NITRO_PRESET
try {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Node.js is missing. Install the project-supported Node.js version first.'
  }
  if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    throw 'npm is missing. Repair the Node.js installation first.'
  }

  function Invoke-ProjectCommand {
    param([string[]]$NpmArguments)
    & npm.cmd @NpmArguments
    if ($LASTEXITCODE -ne 0) {
      throw "Project command failed (exit $LASTEXITCODE). Resolve the reported error before continuing."
    }
  }

  switch ($Action) {
    'Setup' {
      $package = Get-Content -LiteralPath package.json -Raw | ConvertFrom-Json
      if ($package.packageManager -notmatch '^npm@(\d+\.\d+\.\d+)$') {
        throw 'Expected a pinned npm version in package.json.'
      }
      $pinnedNpm = $package.packageManager
      Write-Host "Installing locked dependencies with $pinnedNpm. Global tools and credentials are unchanged."
      & npx.cmd --yes $pinnedNpm ci --no-audit --no-fund
      if ($LASTEXITCODE -ne 0) { throw "Dependency installation failed (exit $LASTEXITCODE)." }
    }
    'Start' {
      Write-Host 'Open http://127.0.0.1:4173. Stop with Ctrl+C in this terminal.'
      Write-Host 'This uses this checkout''s existing environment configuration. No credentials are copied by setup.'
      Invoke-ProjectCommand -NpmArguments @('run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort')
    }
    'Build' {
      $env:NITRO_PRESET = 'cloudflare-module'
      Invoke-ProjectCommand -NpmArguments @('run', 'build')
    }
    'Check' {
      Invoke-ProjectCommand -NpmArguments @('run', 'format:check')
      Invoke-ProjectCommand -NpmArguments @('run', 'typecheck')
      Invoke-ProjectCommand -NpmArguments @('run', 'lint')
      $env:NITRO_PRESET = 'cloudflare-module'
      Invoke-ProjectCommand -NpmArguments @('run', 'build')
      # The smoke suite checks build artifacts, so build must finish first.
      Invoke-ProjectCommand -NpmArguments @('test')
      Write-Host 'All project checks passed for this working copy.'
    }
  }
}
finally {
  $env:NITRO_PRESET = $previousPreset
  Pop-Location
}

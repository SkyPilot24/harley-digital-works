# Local development buttons — 18 October 2026

Select the **Harley Digital Works** local project in Codex mode. Its project folder is `C:/Local Data/The Harley Group/harley-digital-works`.

The local environment is `.codex/environments/environment.toml`. Open Settings > Local environments if the app has not refreshed the actions yet; select **Harley Digital Works - local development**. Configuration is installed as a project file; discovery/selection in the visible app must still be confirmed.

| Button            | What it does                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start website     | Starts this working copy at http://127.0.0.1:4173. Stop with Ctrl+C in its terminal. If the port is occupied, it stops rather than silently choosing another address.                 |
| Check code        | Checks formatting, types and lint; builds the Cloudflare Worker; then runs the existing test suite. Stops at the first failure.                                                       |
| Build             | Builds locally for the existing Cloudflare Worker target. Does not deploy.                                                                                                            |
| Prepare workspace | Installs the lockfile with the exact npm version declared in package.json, without changing global npm. Also runs automatically when this environment is selected for a new worktree. |

Setup requires internet access to obtain the pinned npm package and any uncached locked dependencies. It does not copy secrets, create .env files, apply database migrations, deploy or publish. It runs normal dependency installation hooks. Run Prepare workspace in an idle checkout; dependency installation should not run while another task is using that checkout's node_modules.

Start website uses the checkout's existing local environment. A local website address does not prove its backend is local: do not use real submissions or admin writes unless the intended staging/test target and exact authority have been established. Fresh worktrees intentionally do not inherit ignored credentials; unconfigured backend-dependent screens may show their normal unavailable state.

Node remains installed at 24.19.0 on this Lenovo; CI currently records Node 22. This setup pins npm from package.json (currently 10.9.2) for installs, but does not claim Node version parity or change global runtimes. Resolve runtime policy separately before broadening supported versions.

Direct fallback, from the repository folder: `powershell.exe -NoProfile -File scripts/dev-workspace.ps1 -Action Start` (replace Start with Setup, Check or Build). The wrapper finds the repository from its own path, restores the previous Cloudflare preset and working folder, and propagates failures.

For continuity, start engineering chats from the saved repository project and read the current canonical AGENTS.md, PROJECT_STATUS.md and docs/HANDOVER.md. The older reconciliation worktree at bc42f92 is not current main. Preserve peer branches and unsaved edits.

SSH, Docker repair, remote pairing, sleep settings and changes to global app permissions are separate follow-ups. No remote access was enabled by this setup.

## Setup verification — 18 October 2026

Configuration/schema and PowerShell syntax PASS. Normal Windows RemoteSigned policy permits the launcher; restricted agent sandbox may separately require approval to run local scripts. Invalid action rejected by ValidateSet in the normal user terminal. Fresh isolated snapshot at bc42f922b4e412d8a0e5056ac9e673e742e9851a installed locked dependencies through npm@10.9.2. Check action PASS: format/typecheck/lint/build, 66 smoke + 183 regression + 3 service-worker checks; lint has nine existing warnings. Start action served homepage HTTP 200 on loopback, with no form submission or authenticated writes. Server stopped after verification.

These checks validate the launcher and the isolated snapshot. They are not acceptance of canonical main af5ae9c's newer unsaved peer application batch. Main project helper installation preserves that batch and does not alter package.json, lockfile, secrets or global settings. The separate Build button invokes the same build step already exercised by Check. Visible button discovery and automatic setup triggered by creating a new app worktree still require app-side confirmation; successful manual execution of the exact configured commands does not prove those UI events occurred.

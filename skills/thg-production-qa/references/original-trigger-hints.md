# Original trigger hints

These fields were present in the proposed specification but are not supported by the bundled Codex skill validator. They are reference hints only, not executable hooks or guaranteed automatic triggers. Consult them only when adapting this skill to another host; verify that host's supported configuration first.

```yaml
pathPatterns:
  - "app/**/*"
  - "src/**/*"
  - "pages/**/*"
  - "components/**/*"
  - "public/**/*"
  - "supabase/**/*"
  - "prisma/**/*"
  - "api/**/*"
  - "tests/**/*"
  - "e2e/**/*"
  - "package.json"
  - "next.config.*"
  - "vite.config.*"
  - "vercel.json"
  - "tsconfig.json"
  - "tailwind.config.*"
  - ".github/workflows/**/*"
bashPatterns:
  - '\bnpm\s+run\s+build\b'
  - '\bpnpm\s+build\b'
  - '\byarn\s+build\b'
  - '\bbun\s+run\s+build\b'
  - '\bnpm\s+run\s+test\b'
  - '\bpnpm\s+test\b'
  - '\bnpm\s+run\s+lint\b'
  - '\bpnpm\s+lint\b'
  - '\bnpm\s+run\s+dev\b'
  - '\bpnpm\s+dev\b'
  - '\bvercel\s+deploy\b'
promptSignals:
  phrases:
    - "production ready"
    - "production-ready"
    - "launch ready"
    - "launch-ready"
    - "ready to deploy"
    - "ready to ship"
    - "ready to launch"
    - "final QA"
    - "quality assurance"
    - "QA this"
    - "check everything"
    - "test everything"
    - "audit the site"
    - "audit the app"
    - "review the build"
    - "is this ready"
    - "is this finished"
    - "verify the site"
    - "verify the app"
    - "client handover"
    - "pre-launch"
    - "pre deployment"
    - "pre-deployment"
```

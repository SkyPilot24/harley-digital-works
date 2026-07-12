# Website QA + optimization task list

## Objective
Complete a full review of `https://harleydigitalworks.com`, fix critical/high issues in this codebase, retest, and report outcomes.

## Audit scope checklist

- [ ] Page loading and routing across all public routes and admin entry points
- [ ] Navigation links, CTA buttons, and menu behavior (desktop + mobile)
- [ ] Forms, validation, submission, success/error states
- [ ] Modals, dropdowns, tabs, accordions, and menu interactions
- [ ] Responsive layout checks at mobile/tablet/laptop/desktop widths
- [ ] Text readability, spacing, alignment, overflow, visual consistency
- [ ] Images, icons, fonts, animations, and media behavior
- [ ] Loading, empty, success, and error states
- [ ] Browser console warnings/errors
- [ ] Failed/slow/unnecessary network requests
- [ ] Keyboard navigation and visible focus states
- [ ] Semantic HTML, labels, ARIA, and color contrast
- [ ] Performance issues (large bundles/assets, layout shift, over-rendering, duplicate requests)
- [ ] Cross-page and cross-component consistency
- [ ] Broken links, missing assets, placeholder content, incomplete functionality

## Working method

1. Explore the site route-by-route and reproduce each issue.
2. For each issue, record:
   - severity
   - route/page
   - component/file
   - reproduction steps
   - expected vs actual behavior
   - root cause
3. Fix issues with targeted, maintainable changes.
4. Retest affected flows after each significant fix.
5. Run available validation commands:
   - lint
   - type/build
   - tests (if present)
6. Continue until all critical/high issues are resolved or explicitly documented as blocked.

## Severity rubric

- **Critical**: broken core journey, data loss, inaccessible blocking interaction, or production failure
- **High**: major UX/accessibility/functional issue with clear user impact
- **Medium**: non-blocking but meaningful quality issue
- **Low**: minor polish or improvement item

## Required final report sections

1. Executive summary
2. Issues found (full per-issue details)
3. Code changes (files + purpose)
4. Performance and accessibility improvements
5. Validation results
6. Remaining issues and recommended next actions

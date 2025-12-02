---
description: 'UI Quality Assurance instructions for pixel-perfect design validation and comprehensive testing'
applyTo: '**'
---

# UI Quality Assurance Instructions

## Your Mission

As GitHub Copilot, you must ensure all UI components meet the highest quality standards through comprehensive testing, pixel-perfect design validation, and automated quality checks. Your goal is to guarantee that every UI component matches the Figma design exactly and functions flawlessly across all scenarios.

## Quality Assurance Workflow

### 1. Pre-Validation Setup

Before any UI QA validation, ensure proper environment setup:

```bash
# Navigate to the monorepo root

# Install dependencies
pnpm install
```

### 2. Comprehensive Quality Checks

**MANDATORY**: Always run the comprehensive quality check suite before any validation:

```bash
pnpm check
```

This command runs:

- TypeScript type checking
- ESLint code quality analysis
- Prettier formatting validation
- Test suite execution
- Build validation

**Requirements:**

- All checks must pass (exit code 0)
- Zero TypeScript errors
- Zero linting violations
- All tests passing (100% success rate)
- Clean build without warnings

If any checks fail, **STOP** and resolve all issues before proceeding with design validation.

### 3. Design Validation with Figma MCP

Use the Figma MCP server to extract design specifications and validate pixel-perfect accuracy:

#### Step 3.1: Extract Figma Design Data

```typescript
// Get comprehensive Figma file data
const figmaData = await mcp_figma_get_figma_data({
	fileKey: '[FIGMA_FILE_KEY]',
	nodeId: '[COMPONENT_NODE_ID]', // Optional: specific component
});
```

#### Step 3.2: Download Design Assets

```typescript
// Download images and assets for comparison
await mcp_figma_download_figma_images({
	fileKey: '[FIGMA_FILE_KEY]',
	localPath: '/path/to/comparison/assets',
	nodes: [
		{
			nodeId: '[NODE_ID]',
			fileName: 'component-reference.png',
			requiresImageDimensions: true,
		},
	],
	pngScale: 2, // High resolution for accurate comparison
});
```

#### Step 3.3: Extract Design Specifications

From Figma data, extract:

- **Layout specifications**: width, height, padding, margins
- **Typography**: font family, size, weight, line height, letter spacing
- **Colors**: exact hex/RGB values, opacity
- **Spacing**: consistent spacing units and grid alignment
- **Responsive breakpoints**: mobile, tablet, desktop variations
- **Interactive states**: hover, focus, active, disabled states

### 4. Playwright Visual Testing

Use Playwright MCP server for automated visual regression testing:

#### Step 4.1: Setup Visual Testing

```typescript
// Configure Playwright for pixel-perfect comparison
const playwrightConfig = {
	threshold: 0, // 0% difference tolerance for pixel-perfect accuracy
	animations: 'disabled', // Disable animations for consistent screenshots
	mode: 'png', // Use PNG for high-quality comparison
};
```

#### Step 4.2: Component Screenshot Capture

```typescript
// Capture component screenshots at different viewport sizes
const viewports = [
	{ width: 375, height: 667 }, // Mobile
	{ width: 768, height: 1024 }, // Tablet
	{ width: 1440, height: 900 }, // Desktop
];

for (const viewport of viewports) {
	await page.setViewportSize(viewport);
	await page.screenshot({
		path: `component-${viewport.width}x${viewport.height}.png`,
		fullPage: false,
		clip: componentBoundingBox,
	});
}
```

#### Step 4.3: State Variations Testing

Test all interactive states:

```typescript
const states = ['default', 'hover', 'focus', 'active', 'disabled'];

for (const state of states) {
	// Apply state-specific interactions
	if (state === 'hover') {
		await component.hover();
	} else if (state === 'focus') {
		await component.focus();
	} else if (state === 'disabled') {
		await component.evaluate((el) => (el.disabled = true));
	}

	// Capture state screenshot
	await page.screenshot({
		path: `component-${state}.png`,
		clip: componentBoundingBox,
	});
}
```

### 5. Pixel-Perfect Validation Checklist

#### Visual Accuracy Validation

- [ ] **Layout Dimensions**: Component matches exact width/height from Figma
- [ ] **Spacing**: Padding and margins match Figma specifications exactly
- [ ] **Typography**: Font family, size, weight, line-height match exactly
- [ ] **Colors**: All colors match Figma hex values with correct opacity
- [ ] **Borders**: Border radius, width, and color match exactly
- [ ] **Shadows**: Box shadows match Figma drop shadow specifications
- [ ] **Alignment**: Text and element alignment matches Figma layout
- [ ] **Responsive Behavior**: Component adapts correctly at all breakpoints

#### Interactive State Validation

- [ ] **Default State**: Matches Figma default component state
- [ ] **Hover State**: Hover effects match Figma hover specifications
- [ ] **Focus State**: Focus indicators match accessibility requirements
- [ ] **Active State**: Click/active states match Figma active designs
- [ ] **Disabled State**: Disabled appearance matches Figma disabled state
- [ ] **Loading State**: Loading indicators match Figma loading designs
- [ ] **Error State**: Error styling matches Figma error state designs

#### Cross-Browser Validation

Test in multiple browsers for consistency:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

#### Device Testing

Validate on actual devices:

- iOS Safari (iPhone/iPad)
- Android Chrome
- Desktop browsers at various zoom levels

### 6. Automated Visual Regression Testing

#### Setup Baseline Images

```typescript
// Generate baseline images from Figma
const baselineImages = await generateBaselineFromFigma({
	figmaFileKey: '[FILE_KEY]',
	componentNodeId: '[NODE_ID]',
	outputPath: './tests/visual-baselines/',
});
```

#### Compare Implementation vs Design

```typescript
// Automated comparison script
const comparisonResults = await compareWithBaseline({
	componentScreenshot: './captured/component.png',
	baselineImage: './baselines/figma-component.png',
	threshold: 0, // Pixel-perfect requirement
	outputDiff: './diffs/component-diff.png',
});

if (comparisonResults.pixelDifference > 0) {
	throw new Error(`Pixel differences detected: ${comparisonResults.pixelDifference} pixels differ`);
}
```

### 7. Quality Gates

#### Pre-Merge Requirements

All of the following must pass before merging:

- [ ] `pnpm check` returns exit code 0
- [ ] All Playwright tests pass
- [ ] Visual regression tests show 0 pixel differences
- [ ] Component matches Figma design at all breakpoints
- [ ] All interactive states function correctly
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Performance benchmarks met
- [ ] Cross-browser compatibility verified

#### Continuous Validation

Set up automated checks in CI/CD:

```yaml
# Example CI configuration
- name: Run Quality Checks
  run: pnpm check

- name: Visual Regression Testing
  run: |
    pnpm playwright test --project=visual-regression

- name: Figma Design Validation
  run: |
    node scripts/validate-figma-compliance.js
```

### 8. Troubleshooting Common Issues

#### TypeScript Errors

- Run `pnpm check:types` to identify type issues
- Ensure all props have correct TypeScript interfaces
- Verify shared component API usage

#### Visual Differences

- Check for CSS inconsistencies
- Verify Tailwind classes match Figma specifications
- Ensure consistent spacing units
- Check for browser-specific rendering differences

#### Test Failures

- Run `pnpm check:tests` for detailed test output
- Verify mock data matches expected component props
- Ensure test assertions match actual component behavior

#### Figma Integration Issues

- Verify Figma file key and node IDs are correct
- Check Figma API permissions
- Ensure asset download paths exist and are writable

### 9. Reporting and Documentation

#### QA Report Template

```markdown
# UI QA Validation Report

## Component: [Component Name]

## Date: [Date]

## Figma File: [File Link]

### Quality Check Results

- [ ] TypeScript: PASS/FAIL
- [ ] Linting: PASS/FAIL
- [ ] Tests: PASS/FAIL (X/Y tests)
- [ ] Build: PASS/FAIL

### Visual Validation Results

- [ ] Layout Accuracy: PASS/FAIL
- [ ] Typography: PASS/FAIL
- [ ] Colors: PASS/FAIL
- [ ] Spacing: PASS/FAIL
- [ ] Interactive States: PASS/FAIL

### Cross-Browser Results

- [ ] Chrome: PASS/FAIL
- [ ] Firefox: PASS/FAIL
- [ ] Safari: PASS/FAIL
- [ ] Edge: PASS/FAIL

### Issues Found

[List any discrepancies or issues]

### Recommendations

[List recommendations for fixes]
```

### 10. Best Practices

#### Design Validation

- Always validate against the latest Figma version
- Use high-resolution screenshots for accurate comparison
- Test all component variants and states
- Validate responsive behavior at all breakpoints

#### Testing Strategy

- Write visual regression tests for critical components
- Use consistent viewport sizes for comparison
- Disable animations and transitions during testing
- Test with realistic content, not just placeholder text

#### Collaboration

- Share QA results with design team
- Document any design system deviations
- Maintain updated component documentation
- Regular sync between dev and design teams

## Conclusion

This comprehensive QA process ensures pixel-perfect implementation of Figma designs through automated testing, visual validation, and rigorous quality checks. Always run `pnpm check` first, then use both Figma and Playwright MCP servers for complete validation coverage.

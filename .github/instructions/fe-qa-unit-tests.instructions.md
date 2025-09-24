---
description: 'Frontend Unit Testing Instructions with Vitest, Testing Library, and MSW'
applyTo: '**'
---

# Frontend Unit Testing Instructions

Comprehensive guidelines for writing effective unit tests for React components using Vitest, React Testing Library, and Mock Service Worker (MSW).

## Testing Philosophy

### Core Principles

1. **Test behavior, not implementation details**
2. **Write tests that give you confidence in your code**
3. **Test from the user's perspective**
4. **Avoid testing implementation details that can change without affecting functionality**
5. **Use MSW to mock network requests at the network level**

### Testing Pyramid

- **Unit Tests (70%)**: Individual components and functions
- **Integration Tests (20%)**: Component interactions and data flow
- **E2E Tests (10%)**: Full user workflows

## File Naming Convention

Tests should follow this exact naming pattern:

```
src/
├── components/
│   ├── header/
│   │   ├── header.tsx           # Component
│   │   ├── header.spec.tsx      # Unit tests
│   │   ├── header.mocks.ts      # Mock data
│   │   └── header.stories.tsx   # Storybook stories
│   └── button/
│       ├── button.tsx
│       ├── button.spec.tsx
│       ├── button.mocks.ts
│       └── button.stories.tsx
```

**Rule**: Test files must have the same name as the component file with `.spec.tsx` extension and be located in the same directory as the component. Always include a `.mocks.ts` file with mock data for props and API responses.

## Setup and Configuration

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test-setup.ts'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
```

### Test Setup File

```typescript
// src/test-setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// MSW setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock Next.js router
vi.mock('next/router', () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		pathname: '/',
		query: {},
		asPath: '/',
	}),
}));
```

## Testing Library Best Practices

### 1. Query Selection Priority

Use queries in this order of preference:

```typescript
// ✅ BEST: Queries accessible to everyone
// ✅ BEST: Queries accessible to everyone (preferred)
// Always prefer role-based queries first. Tests should rely on the same semantics that assistive
// technologies and users rely on. If a component does not expose the correct role/label, fix
// the component implementation rather than using a test id.
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email address/i);
screen.getByPlaceholderText(/enter email/i);
screen.getByText(/welcome/i);
screen.getByDisplayValue(/john doe/i);

// ✅ GOOD: Semantic queries
screen.getByAltText(/profile picture/i);
screen.getByTitle(/close dialog/i);

// ⚠️ USE SPARINGLY: Test IDs (when no other option)
// Only use test ids when the element is truly non-semantic (visual helper) or when supporting
// legacy third-party code where adding a role is impossible. Prefer fixing the component to
// expose the correct semantics instead of adding test ids.
screen.getByTestId('submit-button');

// ❌ AVOID: Implementation details
screen.getByClassName('btn-primary');
container.querySelector('.submit-btn');
```

### 2. User Interaction Testing

```typescript
import userEvent from '@testing-library/user-event';

test('user can submit form', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  // Type in form fields
  await user.type(screen.getByLabelText(/email/i), 'user@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello world');

  // Submit form
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Assert outcome
  expect(screen.getByText(/message sent/i)).toBeInTheDocument();
});
```

### 3. Async Testing Patterns

```typescript
// ✅ Use waitFor for async state changes
test('shows loading then data', async () => {
  render(<UserProfile userId="123" />);

  // Wait for loading to disappear
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  expect(screen.getByText(/john doe/i)).toBeInTheDocument();
});

// ✅ Use findBy for elements that will appear
test('displays error message', async () => {
  render(<UserProfile userId="invalid" />);

  const errorMessage = await screen.findByText(/user not found/i);
  expect(errorMessage).toBeInTheDocument();
});
```

## Common Mistakes to Avoid

### 1. Testing Implementation Details

```typescript
// ❌ DON'T: Test internal state
test('sets isLoading to true', () => {
  const { rerender } = render(<UserList />);
  // Don't test component state directly
});

// ✅ DO: Test user-visible behavior
test('shows loading spinner while fetching users', async () => {
  render(<UserList />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
```

### 2. Overusing act()

```typescript
// ❌ DON'T: Wrap everything in act()
test('updates counter', async () => {
  render(<Counter />);

  await act(async () => {
    fireEvent.click(screen.getByRole('button'));
  });
});

// ✅ DO: Use userEvent and waitFor
test('updates counter', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole('button'));
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### 3. Not Cleaning Up Properly

```typescript
// ✅ DO: Clean up after each test
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
	server.resetHandlers();
});
```

## Mock Data Management

### Component Mocks File

Always create a `.mocks.ts` file alongside your component to store all mock data:

```typescript
// components/user-list/user-list.mocks.ts
import { UserListProps } from './user-list';

// Mock props for component testing
export const mockUserListProps: UserListProps = {
	title: 'User Directory',
	maxUsers: 50,
	onUserSelect: vi.fn(),
	className: 'test-user-list',
};

// Mock user data
export const mockUsers = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
];

// Mock API responses for MSW
export const mockApiResponses = {
	getUsersSuccess: mockUsers,
	getUsersError: { error: 'Failed to fetch users', code: 500 },
	getUsersEmpty: [],
	getUsersLoading: null, // Represents loading state
};

// Mock complex scenarios
export const mockUserListScenarios = {
	default: {
		props: mockUserListProps,
		apiResponse: mockApiResponses.getUsersSuccess,
	},
	empty: {
		props: { ...mockUserListProps, title: 'No Users Found' },
		apiResponse: mockApiResponses.getUsersEmpty,
	},
	error: {
		props: mockUserListProps,
		apiResponse: mockApiResponses.getUsersError,
	},
	loading: {
		props: mockUserListProps,
		apiResponse: mockApiResponses.getUsersLoading,
	},
};
```

### MSW Handlers with Mock Data

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { mockApiResponses } from '../components/user-list/user-list.mocks';

export const handlers = [
	// Use mock data from component mocks
	http.get('/api/users', () => {
		return HttpResponse.json(mockApiResponses.getUsersSuccess);
	}),

	// Error scenario using mock data
	http.get('/api/users/error', () => {
		return HttpResponse.json(mockApiResponses.getUsersError, { status: 500 });
	}),

	// Empty state using mock data
	http.get('/api/users/empty', () => {
		return HttpResponse.json(mockApiResponses.getUsersEmpty);
	}),
];
```

## MSW (Mock Service Worker) Integration

### Setup MSW

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
	// Mock successful API response
	http.get('/api/users', () => {
		return HttpResponse.json([
			{ id: 1, name: 'John Doe', email: 'john@example.com' },
			{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
		]);
	}),

	// Mock error response
	http.get('/api/users/:id', ({ params }) => {
		const { id } = params;

		if (id === 'invalid') {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json({
			id: Number(id),
			name: 'John Doe',
			email: 'john@example.com',
		});
	}),

	// Mock POST request
	http.post('/api/users', async ({ request }) => {
		const newUser = await request.json();
		return HttpResponse.json({ id: 3, ...newUser }, { status: 201 });
	}),
];
```

```typescript
// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

### Using MSW in Tests

```typescript
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

test('handles server error', async () => {
  // Override handler for this test
  server.use(
    http.get('/api/users', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<UserList />);

  const errorMessage = await screen.findByText(/something went wrong/i);
  expect(errorMessage).toBeInTheDocument();
});

test('creates new user', async () => {
  const user = userEvent.setup();
  render(<CreateUserForm />);

  await user.type(screen.getByLabelText(/name/i), 'Alice Johnson');
  await user.type(screen.getByLabelText(/email/i), 'alice@example.com');
  await user.click(screen.getByRole('button', { name: /create user/i }));

  await waitFor(() => {
    expect(screen.getByText(/user created successfully/i)).toBeInTheDocument();
  });
});
```

## Component Testing Patterns

### 1. Basic Component Test

```typescript
// components/button/button.spec.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';
import { mockButtonProps } from './button.mocks';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button {...mockButtonProps}>Click me</Button>);

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button {...mockButtonProps} onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button {...mockButtonProps} disabled>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 2. Form Component Test

```typescript
// components/contact-form/contact-form.spec.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './contact-form';
import { mockContactFormProps } from './contact-form.mocks';

describe('ContactForm', () => {
  it('submits form with correct data', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<ContactForm {...mockContactFormProps} onSubmit={onSubmit} />);

    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello world');

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
      });
    });
  });

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<ContactForm {...mockContactFormProps} />);

    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```

### 3. Component with API Integration

```typescript
// components/user-list/user-list.spec.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from './user-list';
import { mockUserListProps } from './user-list.mocks';

describe('UserList', () => {
  it('displays list of users', async () => {
    render(<UserList {...mockUserListProps} />);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(<UserList {...mockUserListProps} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles error state', async () => {
    server.use(
      http.get('/api/users', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<UserList {...mockUserListProps} />);

    const errorMessage = await screen.findByText(/failed to load users/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
```

## Mocking Strategies

### 1. MSW for API Requests (RECOMMENDED)

**Only mock API requests using MSW. Avoid mocking other dependencies unless absolutely necessary.**

```typescript
// Mock API endpoints, not modules
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

test('handles server error', async () => {
  // Override API response for this test
  server.use(
    http.get('/api/users', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<UserList />);

  const errorMessage = await screen.findByText(/something went wrong/i);
  expect(errorMessage).toBeInTheDocument();
});
```

### 2. Minimal External Mocking (USE SPARINGLY)

Only mock external dependencies when they cannot be avoided:

```typescript
// Only mock when absolutely necessary
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Avoid mocking internal modules or components
// ❌ DON'T: Mock internal components
// vi.mock('../components/button', () => ({ Button: () => <div>Mocked Button</div> }));

// ✅ DO: Test with real components
render(<MyComponent />);
expect(screen.getByRole('button')).toBeInTheDocument();
```

## Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('has no accessibility violations', async () => {
  const { container } = render(<ContactForm />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

test('supports keyboard navigation', async () => {
  const user = userEvent.setup();
  render(<Navigation />);

  // Tab through navigation items
  await user.tab();
  expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();

  await user.tab();
  expect(screen.getByRole('link', { name: /about/i })).toHaveFocus();
});
```

## Test Organization

### 1. 3-Level Test Structure (Required)

All test files must follow this exact 3-level describe structure with numbered functional requirements:

```typescript
describe('ComponentName', () => {
	describe('FR01: Basic rendering and content display', () => {
		it('renders with default props', () => {
			// Test implementation
		});

		it('renders with custom props', () => {
			// Test implementation
		});
	});

	describe('FR02: Interactive behavior and event handling', () => {
		it('calls onClick handler when clicked', () => {
			// Test implementation
		});

		it('prevents double clicks', () => {
			// Test implementation
		});
	});

	describe('FR03: State management and variants', () => {
		it('applies correct variant styles', () => {
			// Test implementation
		});

		it('handles disabled state correctly', () => {
			// Test implementation
		});
	});
});
```

**Required Structure:**

- **Level 1**: Component name (e.g., "Button Component", "Calendar", "Toast")
- **Level 2**: Functional requirements with codes (FR01, FR02, FR03, etc.) and descriptive names
- **Level 3**: Individual test cases using `it()` blocks

**Common Functional Requirements (FR) Categories:**

- FR01: Basic rendering and content display
- FR02: Interactive behavior and event handling
- FR03: State management and variants
- FR04: Accessibility and ARIA attributes
- FR05: Form integration and validation
- FR06: Responsive behavior and styling
- FR07: Error handling and edge cases
- FR08: Performance and optimization
- FR09: Integration with external APIs/libraries
- FR10: Advanced features and customization

### 2. Use Descriptive Test Names

```typescript
// ✅ GOOD: Descriptive test names
test('shows error message when email is invalid');
test('disables submit button while form is submitting');
test('redirects to dashboard after successful login');

// ❌ BAD: Vague test names
test('handles input');
test('works correctly');
test('button test');
```

## Performance Testing

```typescript
import { performance } from 'perf_hooks';

test('renders large list efficiently', async () => {
  const startTime = performance.now();

  render(<LargeList items={Array.from({ length: 1000 }, (_, i) => ({ id: i }))} />);

  await waitFor(() => {
    expect(screen.getByText('Item 0')).toBeInTheDocument();
  });

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  // Should render within reasonable time
  expect(renderTime).toBeLessThan(1000); // 1 second
});
```

## Quality Checklist

Before submitting tests, ensure:

- [ ] Tests follow the naming convention (`component.spec.tsx`)
- [ ] Tests use the 3-level structure with FR codes (FR01, FR02, etc.)
- [ ] Tests focus on user behavior, not implementation details
- [ ] All async operations use proper `waitFor` or `findBy` patterns
- [ ] External dependencies are mocked appropriately
- [ ] MSW is used for API mocking
- [ ] Component mocks file (`component.mocks.ts`) is included with props and API response data
- [ ] Tests are organized with descriptive `describe` blocks
- [ ] Error cases and edge cases are covered
- [ ] Accessibility requirements are tested
- [ ] Performance implications are considered for complex components
- [ ] All components have comprehensive test coverage for 100% code coverage

## Common Test Scenarios

## Mocked data and component.mocks

Prefer using the component's `.mocks.ts` for all mocked data used by tests — not just microcopy. This includes:

- Props and component-level microcopy (logo text, placeholders, headings, labels)
- Representative API responses used by MSW handlers
- Complex mock objects and scenarios (feature flags, user profiles, product payloads)

Rationale:

- Keeps tests resilient to copy or payload changes and centralizes test data.
- Makes Storybook, tests and MSW handlers share a single source of truth.
- Reduces brittle expectations and simplifies updates when contract or copy changes.

Example (props + API response):

```typescript
// header/header.mocks.ts
export const mockMicrocopies = {
  logoText: 'B2B Portal',
  searchPlaceholder: 'Search products',
};

export const mockProps = { microcopies: mockMicrocopies } as const;

export const mockApiResponses = {
  getCatalogues: [
    { id: 'cat-1', name: 'Default catalogue' },
    { id: 'cat-2', name: 'Outlet' },
  ],
};

// tests/header.spec.tsx
import { render, screen } from '@testing-library/react';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { Header } from './header';
import { mockProps, mockApiResponses } from './header.mocks';

test('renders brand logo text from mocks and loads catalogues from MSW mock', async () => {
  // Wire MSW to return the component's mock data for the catalogue endpoint
  server.use(
    http.get('/api/catalogues', () => HttpResponse.json(mockApiResponses.getCatalogues))
  );

  render(<Header {...mockProps} />);

  const logo = screen.getByRole('link', { name: /logo/i });
  expect(logo).toHaveTextContent(mockProps.microcopies.logoText);

  // ...then check that catalogue entries rendered from the mocked API appear
  const catalogueItem = await screen.findByText('Default catalogue');
  expect(catalogueItem).toBeInTheDocument();
});
```

Notes:

- If a test must validate a specific legal branding or contract value, document the intent in the test header comment and keep the canonical value in the mocks so it can be updated centrally.
- Keep `*.mocks.ts` collocated with the component and include both props and representative API responses for MSW handlers.

### 1. Feature Flag Testing

```typescript
test('shows new feature when flag is enabled', () => {
  vi.mocked(useFeatureFlag).mockReturnValue(true);

  render(<Dashboard />);

  expect(screen.getByText(/new feature/i)).toBeInTheDocument();
});
```

### 2. Responsive Design Testing

```typescript
test('shows mobile menu on small screens', () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 375,
  });

  window.dispatchEvent(new Event('resize'));

  render(<Navigation />);

  expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
});
```

### 3. Error Boundary Testing

```typescript
test('displays error boundary when component throws', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
```

## Best Practices Summary

1. **Write tests from the user's perspective**
2. **Use semantic queries over test IDs**
3. **Mock at the appropriate level (network, not modules)**
4. **Test behavior, not implementation**
5. **Keep tests focused and isolated**
6. **Use descriptive test names and organize with describe blocks**
7. **Handle async operations properly**
8. **Mock external dependencies consistently**
9. **Test error cases and edge cases**
10. **Maintain good test coverage without obsessing over 100%**

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test header.spec.tsx

# Run tests matching pattern
pnpm test --grep "form submission"
```

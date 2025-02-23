# Teslo Shop - A Full-Featured E-commerce Platform with Next.js and Prisma

A modern e-commerce platform built with Next.js 14, featuring real-time inventory management, secure PayPal payments, and a comprehensive admin dashboard for product and order management.

This application provides a complete e-commerce solution with features like user authentication, shopping cart management, order processing, and inventory tracking. It leverages Next.js server components for optimal performance and Prisma ORM for reliable database operations. The platform includes both customer-facing interfaces for shopping and administrative tools for managing products, orders, and users.

## Repository Structure
```
.
├── src/
│   ├── actions/           # Server actions for data operations
│   │   ├── auth/         # Authentication-related actions
│   │   ├── products/     # Product management operations
│   │   └── orders/       # Order processing and management
│   ├── app/              # Next.js application routes and pages
│   │   ├── (shop)/      # Main shop routes (products, cart, checkout)
│   │   ├── admin/       # Admin dashboard routes
│   │   └── auth/        # Authentication pages
│   ├── components/       # Reusable React components
│   ├── interfaces/       # TypeScript type definitions
│   ├── store/           # Client-side state management with Zustand
│   └── utils/           # Utility functions and helpers
├── prisma/              # Prisma schema and migrations
└── public/             # Static assets
```

## Usage Instructions

### Prerequisites
- Node.js 18 or later
- PostgreSQL database
- PayPal developer account
- Cloudinary account for image storage

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Seed the database (development only)
npm run seed
```

### Quick Start
1. Configure environment variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/teslo"
NEXTAUTH_SECRET="your-secret"
CLOUDINARY_URL="your-cloudinary-url"
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_SECRET="your-paypal-secret"
```

2. Start the development server:
```bash
npm run dev
```

3. Access the application:
- Shop: http://localhost:3000
- Admin: http://localhost:3000/admin

### More Detailed Examples

1. Managing Products (Admin):
```typescript
// Create or update a product
const product = await createUpdateProduct(formData);
```

2. Processing Orders:
```typescript
// Place a new order
const order = await placeOrder(productIds, address);
```

### Troubleshooting

1. Database Connection Issues
- Error: `Could not connect to database`
- Solution: 
```bash
# Verify database connection
npx prisma db push
# Check database URL in .env
```

2. Image Upload Failures
- Error: `Failed to upload image to Cloudinary`
- Solution:
  - Verify Cloudinary credentials
  - Check image file size (max 10MB)
  - Ensure proper image format (JPG, PNG)

## Data Flow
The application follows a structured data flow for processing orders and managing inventory.

```ascii
User -> Cart -> Checkout -> Order Processing -> Payment -> Fulfillment
  ^                                  |
  |                                 v
Admin Dashboard <- Inventory Management <- Order Management
```

Key component interactions:
1. User adds products to cart (client-side state)
2. Checkout process validates inventory and user data
3. Order creation triggers inventory updates
4. Payment processing through PayPal integration
5. Admin dashboard provides real-time order and inventory management
6. Product updates trigger cache revalidation
7. Authentication guards protect sensitive operations

## Infrastructure

![Infrastructure diagram](./docs/infra.svg)

### Database Resources
- PostgreSQL database with Prisma ORM
- Tables:
  - User
  - Product
  - Order
  - Category
  - ProductImage
  - UserAddress
  - OrderAddress

### Cloud Services
- Cloudinary: Image storage and optimization
- PayPal: Payment processing
- PostgreSQL: Database hosting

## Deployment
1. Prerequisites:
- Vercel account
- PostgreSQL database
- Environment variables configured

2. Deployment Steps:
```bash
# Build application
npm run build

# Deploy to Vercel
vercel --prod
```

3. Post-deployment:
- Run database migrations
- Verify environment variables
- Test payment integration
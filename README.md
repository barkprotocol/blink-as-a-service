# BARK BLINK - Blink As A Service
**Aplha version**

![BARK BLINK Web UI Screenshot](.github/images/hero.png?height=400&width=800)

BARK BLINK is a powerful component of Blink BaaS (Blink As A Service) that streamlines interactions with blockchain assets, particularly within the Solana ecosystem. It simplifies user engagement, enhances transaction efficiency, and provides developers with the tools needed to create rich, blockchain-enabled applications.

Bootstrapped from https://github.com/leerob/next-saas-starter

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Streamlined Interactions**: Simplify complex blockchain operations into user-friendly 'Blinks' for effortless engagement with the Solana ecosystem.
- **Enhanced User Engagement**: Improve user experience with intuitive interfaces for blockchain interactions, increasing adoption and participation.
- **Efficient Transactions**: Optimize transaction processes for faster, more cost-effective blockchain operations within the Solana network.
- **Blink BaaS Integration**: Leverage the power of Blink As A Service to create scalable and robust blockchain-enabled applications.
- **Developer Tools**: Access a comprehensive suite of tools and APIs for building rich, blockchain-enabled applications on Solana.
- **Ecosystem Expansion**: Contribute to and benefit from the growing Solana ecosystem, unlocking new possibilities for decentralized applications.
- **Marketing Landing Page** (`/`): Features an animated Terminal element to showcase interaction with blockchain assets.
- **Pricing Page** (`/pricing`): Integrated with Stripe Checkout for seamless payment handling.
- **Dashboard Pages**: Full CRUD (Create, Read, Update, Delete) operations for managing users and teams.
- **Basic Role-Based Access Control (RBAC)**: Supports Owner and Member roles for team and resource management.
- **Subscription Management**: Utilizes Stripe Customer Portal for subscription and payment management.
- **Authentication**: Email/password-based authentication with JWT tokens stored in cookies.
- **Global Middleware**: Protect logged-in routes across the application.
- **Local Middleware**: Secure Server Actions and validate requests using Zod schemas.
- **Activity Logging**: Comprehensive logging system for tracking user activities and interactions.

## Tech Stack

BARK BLINK leverages a modern and powerful tech stack to provide a seamless development experience:

- **Framework**: [Next.js](https://nextjs.org/)
- **Solana web3.js**: Core library for interacting with the Solana blockchain.
- **Anchor**: Framework for Solana smart contract development.
- **React**: Frontend library for building user interfaces.
- **Postgres**: Relational database for storing application data.
- **ORM**: [Drizzle](https://orm.drizzle.team/) for managing database operations.
- **Payments**: [Stripe](https://stripe.com/), [Solana Pay](https://solanapay.com/) integration for checkout and subscription management.
- **UI Library**: [Shadcn/ui](https://ui.shadcn.com/) for a consistent and visually appealing design.
- **Email/password authentication**: JWT-based system with secure cookie storage.

## How It Works

BARK BLINK operates as a middleware layer between your application and the Solana blockchain, providing a simplified interface for complex blockchain operations. Here's an overview of how it works:

1. **User Interaction**: Users interact with your application's frontend, built with React and Next.js, utilizing BARK BLINK components and APIs.
2. **Blink Creation**: When a blockchain operation is needed, BARK BLINK creates a 'Blink' - a simplified representation of the operation.
3. **Transaction Processing**: BARK BLINK uses Solana web3.js and Anchor to handle the complexities of creating, signing, and sending transactions to the Solana network.
4. **Data Storage**: Relevant transaction data and user information are stored in a Postgres database for quick retrieval and analysis.
5. **Confirmation and Feedback**: Once the transaction is confirmed on the Solana blockchain, BARK BLINK provides feedback to your application.
6. **Payment Processing**: Solana Pay and Stripe integration handles subscription payments and API key generation for premium features.
7. **UI Rendering**: shadcn/ui components are used to create a consistent and visually appealing user interface.

## Installation

To install BARK BLINK in your project, use npm:

```bash
npm install bark-blink
```

Ensure you have the following dependencies installed:

```bash
npm install @solana/web3.js @coral-xyz/anchor react next pg stripe
```

For the UI components, install shadcn/ui following their documentation:

```bash
npx shadcn-ui@latest init
```

## Usage

Here's a basic example of how to use BARK BLINK in your Next.js application:

```typescript
import { useState } from 'react';
import { BarkBlink } from 'bark-blink';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TransferPage() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [result, setResult] = useState('');

  const handleTransfer = async () => {
    const barkBlink = new BarkBlink(process.env.BARK_BLINK_API_KEY);

    try {
      const transferBlink = await barkBlink.createBlink({
        type: 'transfer',
        amount,
        token: 'SOL',
        recipient
      });

      const result = await transferBlink.execute();
      setResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setResult(`Error: \${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transfer SOL</h1>
      <Input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-2"
      />
      <Input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="mb-2"
      />
      <Button onClick={handleTransfer}>Transfer</Button>
      {result && (
        <pre className="mt-4 p-2 bg-gray-100 rounded">
          {result}
        </pre>
      )}
    </div>
  );
}
```

## API Reference

For detailed API documentation, please refer to our [API Reference](https://docs.barkprotocol.com/api). **under construction!**

## Contributing

We welcome contributions to BARK BLINK! Please see our [Contributing Guide](CONTRIBUTING.md) for more details on how to get started.

## License

BARK BLINK is licensed under the [Apache 2.0](LICENSE).
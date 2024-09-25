'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mailchimpApiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
    const audienceId = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;
    const dataCenter = process.env.NEXT_PUBLIC_MAILCHIMP_DATA_CENTER;

    if (!mailchimpApiKey || !audienceId || !dataCenter) {
      toast({
        title: "Configuration Error",
        description: "Newsletter subscription is currently unavailable. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/`;

    const data = {
      email_address: email,
      status: 'subscribed',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${mailchimpApiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Subscription Successful",
          description: "You've been successfully subscribed to our newsletter!",
          variant: "default",
        });
        setEmail('');
      } else {
        const errorData = await response.json();
        toast({
          title: "Subscription Failed",
          description: errorData.title || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#D0BFB4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 font-syne">
          Stay Updated
        </h2>
        <p className="text-center text-gray-700 mb-8 font-syne">
          Subscribe to our newsletter for the latest updates, features, and news about BARK BLINK.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="relative flex-grow">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 font-syne bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
              required
              aria-label="Email address for newsletter subscription"
            />
          </div>
          <Button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white font-syne px-6 py-2 rounded-md transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
import Stripe from 'stripe';



export const stripe = new Stripe("sk_test_51R6zHIRWJlybi2c9FhoZPZpwjlNmEffNZSzTBSwUpEfSYr0tgIVkNG1O8bp5iwkBgEh0GuqW0lhtMbOTp6xzpxEz003UCugDHR");

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
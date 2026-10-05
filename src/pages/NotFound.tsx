import React from 'react';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';

const NotFound = () => (
  <PageHero
    title="Page not found"
    lede="The page you are looking for does not exist. Let us help you find what you need."
  >
    <Button to="/" variant="inverse">
      Return to home
    </Button>
  </PageHero>
);

export default NotFound;

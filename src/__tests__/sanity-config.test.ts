import { describe, it, expect, vi } from 'vitest';
import { client } from '@/sanity/lib/client';

describe('Sanity Client Configuration', () => {
  it('should have a configured projectId', () => {
    expect(client.config().projectId).toBeDefined();
  });

  it('should have a configured dataset', () => {
    expect(client.config().dataset).toBeDefined();
  });
});

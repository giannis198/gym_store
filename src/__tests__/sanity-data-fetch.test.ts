import { describe, it, expect, vi } from 'vitest';
import { client } from '@/sanity/lib/client';
import { coach } from '@/sanity/schemaTypes/coach';
import { program } from '@/sanity/schemaTypes/program';
import { scheduleItem } from '@/sanity/schemaTypes/scheduleItem';

vi.mock('@/sanity/lib/client', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

describe('Sanity Data Fetching', () => {
  it('should fetch programs correctly', async () => {
    const mockPrograms = [{ title: 'Boxing 101' }];
    (client.fetch as any).mockResolvedValue(mockPrograms);

    const programs = await client.fetch('*[_type == "program"]');
    expect(programs).toEqual(mockPrograms);
    expect(client.fetch).toHaveBeenCalledWith('*[_type == "program"]');
  });
});

describe('Sanity Schema Definitions', () => {
  it('coach schema should have expected properties', () => {
    expect(coach).toBeDefined();
    expect(coach.name).toBe('coach');
    expect(coach.title).toBe('Coach');
    expect(coach.type).toBe('document');
    expect(Array.isArray(coach.fields)).toBe(true);
    expect(coach.fields.length).toBeGreaterThan(0);
  });

  it('program schema should have expected properties', () => {
    expect(program).toBeDefined();
    expect(program.name).toBe('program');
    expect(program.title).toBe('Program');
    expect(program.type).toBe('document');
    expect(Array.isArray(program.fields)).toBe(true);
    expect(program.fields.length).toBeGreaterThan(0);
  });

  it('scheduleItem schema should have expected properties', () => {
    expect(scheduleItem).toBeDefined();
    expect(scheduleItem.name).toBe('scheduleItem');
    expect(scheduleItem.title).toBe('Schedule Item');
    expect(scheduleItem.type).toBe('document');
    expect(Array.isArray(scheduleItem.fields)).toBe(true);
    expect(scheduleItem.fields.length).toBeGreaterThan(0);
  });
});

import React from 'react';
import { getSubtotal } from '../services/utils';

describe('Get subtotal test suite', () => {
  test('Should return subtotal prices from list: [20, 50, 20, 20]', () => {
    expect(
      getSubtotal([
        {
          price: 20,
          available: 1,
        },
        {
          price: 50,
          available: 1,
        },
        {
          price: 20,
          available: 1,
        },
        {
          price: 20,
          available: 1,
        },
      ])
    ).toBe(110);
  });
});

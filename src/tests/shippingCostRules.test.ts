import React from 'react';

describe('Shipping Cost Rules test suite', () => {
  test('Should return 0 when purchase above $400', () => {
    expect(shippingCostRules(30, 410, 8)).toBe(0);
  });

  test('Should return 37 when items above 15', () => {
    expect(shippingCostRules(37, 128, 17)).toBe(44);
  });
});

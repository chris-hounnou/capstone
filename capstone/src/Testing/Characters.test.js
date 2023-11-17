import { render, screen } from '@testing-library/react';
import Characters from '../pages/Characters';

test('it renders without crashing',() => {
render(<Characters/>)
})
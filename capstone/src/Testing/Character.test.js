import { render, screen } from '@testing-library/react';
import Character from '../pages/Character';

test('it renders without crashing',() => {
render(<Character/>)
})
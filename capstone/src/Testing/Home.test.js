import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('it renders without crashing',() => {
render(<Home/>)
})
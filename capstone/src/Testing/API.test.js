import { render, screen } from '@testing-library/react';
import OfIceAndFireApi from '../services/OfIceAndFireApi';

test('it renders without crashing',() => {
render(<OfIceAndFireApi/>)
})
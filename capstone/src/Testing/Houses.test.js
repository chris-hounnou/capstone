import { render, screen } from '@testing-library/react';
import Houses from '../pages/Houses';


test('it renders without crashing',() => {
    render(<Houses/>)
    })
    
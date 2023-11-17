import { render, screen } from '@testing-library/react';
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import {Router} from react
test('it renders without crashing',() => {
render(
<Router>
<NavigationBar/>
</Router>
);
})
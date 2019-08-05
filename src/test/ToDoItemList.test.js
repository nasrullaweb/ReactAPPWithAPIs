import React from 'react';
import ToDoList from '.././Components/ToDoItemList';
import renderer from 'react-test-renderer';

test('Render todo List', () => {
    const component = renderer.create(
        <ToDoList 
          items={[{text:'first list', id:1}, {text:'Second list', id:2}]}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });

  


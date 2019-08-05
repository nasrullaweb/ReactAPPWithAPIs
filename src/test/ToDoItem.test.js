import React from 'react';
import ToDoItem from '.././Components/ToDoItem';
import renderer from 'react-test-renderer';

test('Render todo form', () => {
    const component = renderer.create(
        <div className="todoListMain">
        <div className="header">
            <form>
                <input type="text" value="the value"/>
                <button>Add</button>
                <button>Cancel</button>
            </form>
        </div>
    </div>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
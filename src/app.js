import React, { useState, useEffect } from 'react';

// Генератор уникальных идентификаторов 
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function App({ store }) {
  const [list, setList] = useState(store.getState().list);

  useEffect(() => {
    const updateList = () => {
      setList([...store.getState().list]);
    };

    store.subscribe(updateList);

    return () => {
      store.unsubscribe(updateList);
    };
  }, [store]);

  const handleAddItem = () => {
    const newItem = {
      code: uuidv4(),
      title: 'Новая запись',
      selected: false,
      highlightCount: 0, // Добавляем новое свойство для подсчета выделений
    };

    store.addItem(newItem);
  };
  
  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={handleAddItem}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>
          {list.map(item => (
            <div key={item.code} className='List-item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}</div>
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

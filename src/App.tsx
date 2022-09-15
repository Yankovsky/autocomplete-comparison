import React, { useEffect } from 'react'
import './App.css'
import { Item } from './types'
import { DownshiftCombobox } from './DownshiftCombobox'
import { HeadlessUiCombobox } from './HeadlessUiCombobox'


function App() {
  const [search, setSearch] = React.useState<string>('');
  const [apis, setApis] = React.useState<Item[]>([]);
  const [selected, setSelected] = React.useState<Item | null>(null);
  useEffect(() => {
    if (search) {
      fetch(`https://api.publicapis.org/entries?title=${search}`)
        .then(response => response.json())
        .then(data => setApis(data.entries ? data.entries.slice(0, 3) : []))
    } else {
      setApis([])
    }
  }, [search])

  return (
    <>
      <div><input type="text" value={search} onChange={e => setSearch(e.target.value)}/></div>
      <div>Selected: {(selected === undefined || selected === null) ? 'Nothing' : selected.API}</div>
      <div>
        <h1>Downshift</h1>
        <DownshiftCombobox search={search} setSearch={setSearch} onSelect={setSelected} apis={apis}/>
      </div>
      <div>
        <h1>HeadlessUI</h1>
        <HeadlessUiCombobox search={search} setSearch={setSearch} onSelect={setSelected} apis={apis}/>
      </div>
      {/*<div>*/}
      {/*  <h1>Plain</h1>*/}
      {/*  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>*/}
      {/*  <ul>{apis.slice(0, 3).map(u => <li>{u.API}</li>)}</ul>*/}
      {/*</div>*/}
    </>
  );
}

export default App;

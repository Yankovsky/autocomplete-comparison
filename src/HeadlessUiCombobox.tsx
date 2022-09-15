import React, { CSSProperties } from 'react'
import { Item, Props } from './types'
import { Combobox } from '@headlessui/react'

// https://headlessui.com/react/combobox
export const HeadlessUiCombobox: React.FC<Props> = ({ apis, onSelect, search, setSearch }) => {
  const handleSelection = (item: Item) => {
      onSelect(item)
      setSearch(item.API)
  }
  return <Combobox onChange={(item) => onSelect(item)} value={search} multiple={false} nullable={false}>
    <Combobox.Input onChange={(event) => setSearch(event.target.value)}/>
    <Combobox.Button>
      {(props) => props.open ? <>&#8593;</> : <>&#8595;</>}
    </Combobox.Button>
    <Combobox.Options>
      {apis.map((api, index) => {
        return (
          <Combobox.Option key={api.Link} value={api}>
            {({ active, selected }) => {
              const styles: CSSProperties = {}
              if (active) {
                styles.backgroundColor = 'lightgray'
              }
              if (selected) {
                styles.fontWeight = 'bold'
              }
              return (
                <span style={styles}>
                  {api.API}
                </span>
              )
            }}
          </Combobox.Option>
        )
      })}
    </Combobox.Options>
  </Combobox>
}

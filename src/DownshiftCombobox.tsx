// https://www.downshift-js.com/use-combobox
import React from 'react'
import { useCombobox } from 'downshift'
import { Props } from './types'

export const DownshiftCombobox: React.FC<Props> = ({ apis, onSelect, search, setSearch }) => {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    inputValue: search,
    onInputValueChange({ inputValue }) {
      if (inputValue !== undefined) {
        setSearch(inputValue)
      }
    },
    items: apis,
    itemToString(item) {
      return item ? item.API : ''
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem !== undefined) {
        onSelect(newSelectedItem)
      }
    },
  })

  return (
    <div>
      <label {...getLabelProps()}>
        my label:
      </label>
      <div
        {...getComboboxProps()}
      >
        <input
          placeholder="my placeholder"
          {...getInputProps()}
        />
        <button
          aria-label="toggle menu"
          type="button"
          {...getToggleButtonProps()}
        >
          {isOpen ? <>&#8593;</> : <>&#8595;</>}
        </button>
      </div>
      <ul
        {...getMenuProps()}
      >
        {isOpen &&
          apis.map((item, index) => (
            <li
              key={`${item.Link}${index}`}
              {...getItemProps({
                item, index,
                style: {
                  backgroundColor:
                    highlightedIndex === index ? 'lightgray' : 'white',
                  fontWeight: selectedItem && selectedItem.Link === item.Link ? 'bold' : 'normal',
                },
              })}
            >
              <span>{item.API}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
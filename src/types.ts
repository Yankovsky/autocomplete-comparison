export type Item = {
  API: string;
  Link: string;
}

export type Props = {
  apis: Item[],
  search: string,
  setSearch: (value: string) => void,
  onSelect: (item: Item | null) => void,
}

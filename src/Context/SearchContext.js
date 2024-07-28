import React from 'react'

const SearchContext = React.createContext({
  searchText: '',
  updateSearchText: () => {},

  showSearchComponent: false,
  searchDataFetchStatus: 'INITIAL',

  changeStatusOfSearchComponent: () => {},
  searchComponentShowStatusChange: () => {},

  userPosts: [],
})

export default SearchContext

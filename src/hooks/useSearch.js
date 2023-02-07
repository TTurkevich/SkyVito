import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../features/adv/advSlice'

const useSearch = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [clear, setClear] = useState(false)

  const handleSearch = (event) => {
    if (event.target.value === '' && clear) {
      setSearchTerm('')
      dispatch(setSearch(''))
      setClear(false)
    } else {
      setSearchTerm(event.target.value)
      setClear(true)
    }
  }

  const handleMobSearch = (event) => {
    dispatch(setSearch(event.target.value))
  }

  const handleClick = () => {
    dispatch(setSearch(searchTerm))
    setClear(true)
  }

  return [handleSearch, handleMobSearch, handleClick]
}

export default useSearch

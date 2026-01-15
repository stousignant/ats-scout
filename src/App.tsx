import { useState } from 'react'
import SearchForm from './components/SearchForm'
import './App.css'

function App() {
  const handleSearch = (criteria: { role: string; location: string }) => {
    console.log('Search criteria:', criteria);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">ATS Scout</h1>
        <SearchForm onSearch={handleSearch} />
      </div>
    </div>
  )
}

export default App

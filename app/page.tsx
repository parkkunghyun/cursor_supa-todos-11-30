'use client'

import { useState } from 'react'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleAdd = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            할 일 관리
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Supabase + Next.js로 만든 Todo 앱
          </p>

          <TodoForm onAdd={handleAdd} />
          <TodoList key={refreshKey} />
        </div>
      </div>
    </main>
  )
}


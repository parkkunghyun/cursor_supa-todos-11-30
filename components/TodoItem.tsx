'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Todo } from '@/lib/supabase'

interface TodoItemProps {
  todo: Todo
  onUpdate: () => void
}

export default function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleToggle = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      onUpdate()
    } catch (error) {
      console.error('Error updating todo:', error)
      alert('할 일 업데이트에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      onUpdate()
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert('할 일 삭제에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 ${
        todo.completed ? 'opacity-60' : ''
      } ${isDragging ? 'z-50' : ''}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none"
        aria-label="드래그하여 순서 변경"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-400 hover:text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isLoading}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
      />
      <span
        className={`flex-1 ${
          todo.completed
            ? 'line-through text-gray-500'
            : 'text-gray-900'
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        삭제
      </button>
    </div>
  )
}

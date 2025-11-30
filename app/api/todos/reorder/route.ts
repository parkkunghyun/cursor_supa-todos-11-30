import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// PUT update order of todos in bulk
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { todos } = body

    if (!Array.isArray(todos)) {
      return NextResponse.json(
        { error: 'Todos array is required' },
        { status: 400 }
      )
    }

    // Update each todo's order
    const updatePromises = todos.map((todo: { id: string; order: number }) =>
      supabase
        .from('todos')
        .update({ order: todo.order })
        .eq('id', todo.id)
    )

    const results = await Promise.all(updatePromises)

    // Check for errors
    const errors = results.filter((result) => result.error)
    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Failed to update some todos' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Todos reordered successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reorder todos' },
      { status: 500 }
    )
  }
}


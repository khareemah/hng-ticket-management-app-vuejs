"use client"

import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

export interface User {
  id: string
  email: string
  name: string
  password: string
}

const mockUsers: Record<string, { password: string; name: string }> = {
  "test@example.com": { password: "password123", name: "Test User" },
  "demo@example.com": { password: "demo123", name: "Demo User" },
}

const getStoredUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem("ticketapp_users") || "[]")
  } catch {
    return []
  }
}

const saveStoredUsers = (users: User[]) => {
  localStorage.setItem("ticketapp_users", JSON.stringify(users))
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const isLoading = ref(true)

  const initAuth = () => {
    const session = localStorage.getItem("ticketapp_session")
    if (session) {
      try {
        const userData = JSON.parse(session)
        user.value = userData
      } catch {
        localStorage.removeItem("ticketapp_session")
      }
    }
    isLoading.value = false
  }

  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Email and password are required")

    const mockUser = mockUsers[email]
    if (mockUser && mockUser.password === password) {
      const userData: User = {
        id: "mock-" + Math.random().toString(36).substring(2, 9),
        email,
        name: mockUser.name,
        password,
      }
      localStorage.setItem("ticketapp_session", JSON.stringify(userData))
      user.value = userData
      return
    }

    const users = getStoredUsers()
    const existingUser = users.find((u) => u.email === email && u.password === password)
    if (!existingUser) throw new Error("Invalid email or password")

    localStorage.setItem("ticketapp_session", JSON.stringify(existingUser))
    user.value = existingUser
  }

  const signup = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) throw new Error("All fields are required")

    const users = getStoredUsers()
    if (users.some((u) => u.email === email)) throw new Error("User already exists. Please log in instead.")

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      name,
      password,
    }
    const updatedUsers = [...users, newUser]
    saveStoredUsers(updatedUsers)

    localStorage.setItem("ticketapp_session", JSON.stringify(newUser))
    user.value = newUser
  }

  const logout = () => {
    localStorage.removeItem("ticketapp_session")
    user.value = null
    setTimeout(() => {
      router.push("/")
    }, 50)
  }

  const isAuthenticated = computed(() => user.value !== null)

  return {
    user: computed(() => user.value),
    isLoading: computed(() => isLoading.value),
    isAuthenticated,
    login,
    signup,
    logout,
    initAuth,
  }
})

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
  const date = new Date(createdAt)
  const now = new Date()
  const diff = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
  const diffHours = Math.ceil(diff / (1000 * 3600))
  const diffMinutes = Math.ceil(diff / (1000 * 60))
  const diffSeconds = Math.ceil(diff / 1000)

  if (diffDays > 1) {
    return `${diffDays} days ago`
  } else if (diffHours > 1) {
    return `${diffHours} hours ago`
  } else if (diffMinutes > 1) {
    return `${diffMinutes} minutes ago`
  } else {
    return `${diffSeconds} seconds ago`
  }
}

export const formatNumber = (num: number): string => {
  if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num > 1000) {
    return `${(num / 1000).toFixed(1)}K`
  } else {
    return `${num}`
  }
}
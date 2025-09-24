// utils/timeAgo.js
export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`

  interval = Math.floor(seconds / 604800)
  if (interval >= 1) return interval === 1 ? "1 week ago" : `${interval} weeks ago`

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) return interval === 1 ? "1 day ago" : `${interval} days ago`

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) return interval === 1 ? "1 hour ago" : `${interval} hours ago`

  interval = Math.floor(seconds / 60)
  if (interval >= 1) return interval === 1 ? "1 min ago" : `${interval} min ago`

  return "Just now"
}

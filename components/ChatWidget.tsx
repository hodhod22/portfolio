'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FiMessageSquare, FiX, FiSend, FiMail, FiUser } from 'react-icons/fi'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  
  const sendMessage = useMutation(api.chat.sendMessage)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    
    try {
      await sendMessage(formData);
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 3000);
      setTimeout(() => setIsOpen(false), 2000);
      // Skicka även email-notis
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-110"
      >
        <FiMessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 animate-slide-up">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="font-semibold text-lg">Live Chat</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Jag svarar så snart jag kan!</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 items-center gap-2">
                <FiUser className="w-4 h-4" />
                Ditt namn
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Anna Svensson"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 items-center gap-2">
                <FiMail className="w-4 h-4" />
                Din email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="anna@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Meddelande</label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Hej! Jag är intresserad av att anlita dig för..."
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSending ? (
                'Skickar...'
              ) : (
                <>
                  <FiSend />
                  Skicka meddelande
                </>
              )}
            </button>

            {isSent && (
              <div className="text-center text-sm text-green-600 dark:text-green-400">
                ✨ Tack! Jag återkommer via email inom kort.
              </div>
            )}
          </form>
        </div>
      )}
    </>
  )
}
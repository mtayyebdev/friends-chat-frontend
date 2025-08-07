import React, { useState } from 'react'
import { Button, InputBox } from '../../components/index.js'

function Support() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.table({ name, email,subject, message })
    setName("")
    setEmail("")
    setMessage("")
    setSubject("")
    alert("Your message has been sent!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Contact Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Contact Support</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Name</label>
              <InputBox type='text' id={"name"} placeholder={"Your name"} value={name} setValue={setName} required={true}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email</label>
              <InputBox type='email' id={"email"} placeholder={"Your email"} value={email} setValue={setEmail} required={true}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="subject">Subject</label>
              <InputBox type='text' id={"subject"} placeholder={"Your Issue"} value={subject} setValue={setSubject} required={true}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="w-full px-4 py-2 rounded-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your problem or question"
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            <Button value={"Send Message"} size='xl' extraClass='w-full'/>
          </form>
        </div>
        {/* Contact Details */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 md:pl-8 pt-8 md:pt-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Contact Details</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold">Email:</span> support@chatapp.com
            </li>
            <li>
              <span className="font-semibold">Phone:</span> +1 234 567 890
            </li>
            <li>
              <span className="font-semibold">WhatsApp:</span> +1 234 567 890
            </li>
            <li>
              <span className="font-semibold">Telegram:</span> @chatapp_support
            </li>
            <li>
              <span className="font-semibold">Address:</span> 123 ChatApp Lane, Silicon Valley, CA
            </li>
          </ul>
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We usually respond within 24 hours. For urgent issues, please use WhatsApp or Telegram.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
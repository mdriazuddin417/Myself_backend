"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, Search, Eye, Trash2, Reply, MailOpen } from "lucide-react"
import { dummyContactMessages } from "@/lib/dummy-data"

export default function AdminMessagesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState(dummyContactMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<(typeof dummyContactMessages)[0] | null>(null)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadCount = messages.filter((msg) => !msg.read).length

  const markAsRead = (messageId: string) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)))
  }

  const deleteMessage = (messageId: string) => {
    setMessages(messages.filter((msg) => msg.id !== messageId))
  }

  const handleReply = () => {
    // In a real app, this would send an email
    alert(`Reply sent to ${selectedMessage?.email}`)
    setReplyText("")
    setSelectedMessage(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
              <p className="text-muted-foreground">Manage contact form submissions ({unreadCount} unread)</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search messages by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Messages Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Messages ({filteredMessages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <Badge variant={message.read ? "secondary" : "destructive"}>
                          {message.read ? "Read" : "New"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{message.name}</TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell className="max-w-xs truncate">{message.subject}</TableCell>
                      <TableCell>{message.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedMessage(message)
                                  if (!message.read) {
                                    markAsRead(message.id)
                                  }
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Message from {message.name}</DialogTitle>
                                <DialogDescription>
                                  {message.email} • {message.createdAt.toLocaleDateString()}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Subject:</h4>
                                  <p>{message.subject}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Message:</h4>
                                  <p className="whitespace-pre-wrap">{message.message}</p>
                                </div>
                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Reply:</h4>
                                  <Textarea
                                    placeholder="Type your reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={4}
                                  />
                                  <Button onClick={handleReply} className="mt-2" disabled={!replyText.trim()}>
                                    <Reply className="h-4 w-4 mr-2" />
                                    Send Reply
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(message.id)}
                            disabled={message.read}
                          >
                            <MailOpen className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteMessage(message.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredMessages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No messages found matching your search.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

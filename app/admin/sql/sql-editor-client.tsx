"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Play, Trash } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CodeEditor } from "@/components/code-editor"

interface QueryResult {
  columns: string[]
  rows: any[]
  rowCount: number
  duration: number
}

export function SqlEditorClient() {
  const [sql, setSql] = useState<string>("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [result, setResult] = useState<QueryResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [queryHistory, setQueryHistory] = useState<{ sql: string; timestamp: Date }[]>([])
  const { toast } = useToast()

  const executeQuery = async () => {
    if (!sql.trim()) {
      toast({
        title: "Error",
        description: "Please enter a SQL query",
        variant: "destructive",
      })
      return
    }

    setIsExecuting(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/sql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to execute query")
      }

      const data = await response.json()
      setResult(data)
      setQueryHistory((prev) => [...prev, { sql, timestamp: new Date() }])

      toast({
        title: "Query executed successfully",
        description: `Affected ${data.rowCount} rows in ${data.duration}ms`,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to execute query",
        variant: "destructive",
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const clearHistory = () => {
    setQueryHistory([])
    toast({
      title: "Query history cleared",
    })
  }

  const loadQuery = (sql: string) => {
    setSql(sql)
    toast({
      title: "Query loaded",
    })
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">SQL Editor</h1>
          <div className="flex items-center gap-2">
            <Button onClick={executeQuery} disabled={isExecuting || !sql.trim()} className="gap-2">
              {isExecuting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Execute
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor and Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* SQL Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Query Editor</CardTitle>
                <CardDescription>Write your SQL query below</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="min-h-[300px] border rounded-md">
                  <CodeEditor value={sql} onChange={setSql} language="sql" placeholder="Enter your SQL query here..." />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                {result && (
                  <CardDescription>
                    {result.rowCount} rows returned in {result.duration}ms
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="text-red-500 p-4 bg-red-50 dark:bg-red-950/50 rounded-md">{error}</div>
                ) : result ? (
                  <ScrollArea className="h-[400px] rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {result.columns.map((column, i) => (
                            <TableHead key={i}>{column}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.rows.map((row, i) => (
                          <TableRow key={i}>
                            {result.columns.map((column, j) => (
                              <TableCell key={j}>{row[column]?.toString() ?? "NULL"}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                ) : (
                  <div className="text-center text-muted-foreground p-8">Execute a query to see results</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Query History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Query History</CardTitle>
                  <Button variant="ghost" size="icon" onClick={clearHistory} disabled={queryHistory.length === 0}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {queryHistory.length === 0 ? (
                  <div className="text-center text-muted-foreground p-4">No queries executed yet</div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {queryHistory.map((query, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-md hover:bg-muted cursor-pointer group"
                          onClick={() => loadQuery(query.sql)}
                        >
                          <div className="text-sm font-medium truncate">{query.sql}</div>
                          <div className="text-xs text-muted-foreground">{query.timestamp.toLocaleTimeString()}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}


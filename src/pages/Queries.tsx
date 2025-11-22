import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type QueryItem = {
  _id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

const Queries = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<QueryItem | null>(null);
  const [items, setItems] = useState<QueryItem[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const base = "http://65.1.55.93:4000/api"
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        const res = await fetch(`${String(base).replace(/\/$/, '')}/queries`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        })
        if (res.ok) {
          const data = await res.json()
          setItems(Array.isArray(data) ? data : [])
        }
      } catch {}
    }
    load()
  }, [])

  return (
    <div className="py-6 md:py-8 px-3 md:px-0">
      

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>All Queries</CardTitle>
          <CardDescription>Customer submissions from the Let's Connect form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full">
          <Table className="min-w-[720px] w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="w-48">Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((query) => (
                <TableRow key={query._id}>
                  <TableCell className="font-medium">{query.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{query.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{query.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-48 overflow-hidden">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="block text-sm text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis cursor-help">
                          {query.message.split(/\s+/)[0]}...
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        {query.message}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{new Date(query.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">New</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={async () => {
                      try {
                        const base = "http://65.1.55.93:4000/api"
                        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
                        const res = await fetch(`${String(base).replace(/\/$/, '')}/queries/${query._id}`, {
                          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                        })
                        if (res.ok) {
                          const data = await res.json()
                          setSelected(data)
                          setOpen(true)
                        }
                      } catch {}
                    }}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Query Details</DialogTitle>
            <DialogDescription>Review the customer's message and contact details.</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="text-sm"><span className="font-medium">Name:</span> {selected.name}</div>
              <div className="text-sm"><span className="font-medium">Email:</span> {selected.email}</div>
              <div className="text-sm"><span className="font-medium">Phone:</span> {selected.phone}</div>
              <div className="text-sm"><span className="font-medium">Date:</span> {selected.date}</div>
              <div className="text-sm"><span className="font-medium">Status:</span> {selected.status}</div>
              <div className="text-sm"><span className="font-medium">Message:</span> {selected.message}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Queries;

import { ColumnDef } from "@tanstack/react-table"

export type Person = {
  id: string
  name: string
  email: string
  role: string
}

export const data: Person[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Tester",
  },
]

export const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
]


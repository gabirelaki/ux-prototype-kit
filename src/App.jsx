import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

const SCREENS = {
  dashboard: 'dashboard',
  equipment: 'equipment',
  detail: 'detail',
}

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'locations', label: 'Locations' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'training', label: 'Training & Services' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'documents', label: 'Documents' },
  { id: 'invoices', label: 'Invoices & Orders' },
  { id: 'support', label: 'Support' },
]

const DASHBOARD_DEVICES = [
  {
    device: 'Cardiac Science Powerheart G5',
    location: 'Main Lobby',
    status: 'Pass',
    inspectionDue: 'Jun 15, 2026',
  },
  {
    device: 'Philips HeartStart FRx',
    location: 'Gymnasium',
    status: 'Needs Review',
    inspectionDue: 'May 1, 2026',
  },
  {
    device: 'ZOLL AED Plus',
    location: 'Cafeteria',
    status: 'Fail',
    inspectionDue: 'Apr 20, 2026',
  },
]

const EQUIPMENT_DEVICES = [
  {
    device: 'Cardiac Science Powerheart G5',
    location: 'Main Lobby',
    status: 'Pass',
    inspectionDue: 'Jun 15, 2026',
  },
  {
    device: 'Philips HeartStart FRx',
    location: 'Gymnasium',
    status: 'Needs Review',
    inspectionDue: 'May 1, 2026',
  },
  {
    device: 'ZOLL AED Plus',
    location: 'Cafeteria',
    status: 'Fail',
    inspectionDue: 'Apr 20, 2026',
  },
  {
    device: 'Defibtech Lifeline VIEW',
    location: 'Pool Area',
    status: 'Pass',
    inspectionDue: 'Jul 3, 2026',
  },
  {
    device: 'HeartSine Samaritan PAD 350P',
    location: 'Conference Room B',
    status: 'Needs Review',
    inspectionDue: 'May 18, 2026',
  },
]

function StatusBadge({ status }) {
  const styles = {
    Pass: 'bg-green-100 text-green-800 border-green-200',
    'Needs Review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Fail: 'bg-red-100 text-red-800 border-red-200',
  }

  return (
    <Badge variant="outline" className={cn('border', styles[status])}>
      {status}
    </Badge>
  )
}

function TopNav() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-white px-4">
      <span className="text-lg font-semibold tracking-tight">Arch</span>
      <input
        type="search"
        placeholder="Search devices, locations..."
        className="h-8 max-w-md flex-1 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground"
      />
      <Button className="bg-yellow-400 text-yellow-950 hover:bg-yellow-500">
        Status Check
      </Button>
      <Button variant="ghost" size="sm" className="text-muted-foreground">
        Notifications
      </Button>
      <Button variant="ghost" size="sm" className="text-muted-foreground">
        Cart
      </Button>
      <span className="text-sm font-medium">Mary Lin</span>
    </header>
  )
}

function Sidebar({ activeNav, onNavigate }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r bg-muted/30">
      <nav className="flex flex-col gap-0.5 p-3">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive =
            activeNav === item.id ||
            (item.id === 'equipment' && activeNav === 'detail')

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === 'dashboard') onNavigate(SCREENS.dashboard)
                if (item.id === 'equipment') onNavigate(SCREENS.equipment)
              }}
              className={cn(
                'rounded-md px-3 py-2 text-left text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                item.id !== 'dashboard' &&
                  item.id !== 'equipment' &&
                  'cursor-default opacity-60',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

function AppShell({ screen, activeNav, onNavigate, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1">
        <Sidebar activeNav={activeNav} onNavigate={onNavigate} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

function DeviceTable({ rows, onRowClick, showActions = false }) {
  return (
    <Card>
      <CardContent className="p-0 pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Inspection Due</TableHead>
              {showActions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.device}
                className="cursor-pointer"
                onClick={() => onRowClick(row)}
              >
                <TableCell className="font-medium">{row.device}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell>{row.inspectionDue}</TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Pass
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Fail
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function DashboardScreen({ onNavigate }) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Total Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Compliant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">18</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Needs Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">6</p>
          </CardContent>
        </Card>
      </div>
      <DeviceTable
        rows={DASHBOARD_DEVICES}
        onRowClick={() => onNavigate(SCREENS.detail)}
      />
    </>
  )
}

function EquipmentScreen({ onNavigate }) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Inspectable Equipment</h1>
      <div className="mb-4 flex flex-wrap gap-3">
        {['Manufacturer', 'Model', 'Location', 'Status'].map((label) => (
          <select
            key={label}
            className="h-8 min-w-[140px] rounded-md border border-input bg-background px-3 text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              {label}
            </option>
            <option value="all">All</option>
          </select>
        ))}
      </div>
      <DeviceTable
        rows={EQUIPMENT_DEVICES}
        onRowClick={() => onNavigate(SCREENS.detail)}
        showActions
      />
    </>
  )
}

function DetailScreen({ onNavigate }) {
  const fields = [
    { label: 'Location', value: 'Main Lobby' },
    { label: 'Site & Placement', value: 'Building A — Wall mount near reception' },
    { label: 'Serial', value: 'CS-G5-2024-00891' },
    { label: 'Status', value: <StatusBadge status="Pass" /> },
    { label: 'Readiness Status', value: 'Ready' },
    { label: 'Compliance Status', value: 'Compliant' },
    { label: 'Inspection Date', value: 'Mar 15, 2026' },
    { label: 'Last Check', value: 'May 10, 2026 — Mary Lin' },
  ]

  const leftCol = fields.slice(0, 4)
  const rightCol = fields.slice(4)

  return (
    <>
      <p className="mb-2 text-sm text-muted-foreground">
        Equipment / Inspectable Equipment / Device Detail
      </p>
      <h1 className="mb-6 text-2xl font-semibold">
        Cardiac Science Powerheart G5
      </h1>
      <Card className="mb-8 max-w-3xl">
        <CardContent className="grid gap-6 pt-4 sm:grid-cols-2">
          <dl className="space-y-4">
            {leftCol.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <dl className="space-y-4">
            {rightCol.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="outline" onClick={() => onNavigate(SCREENS.equipment)}>
          Back
        </Button>
        <Button
          size="lg"
          className="min-w-[120px] bg-green-600 text-white hover:bg-green-700"
        >
          Pass
        </Button>
        <Button
          size="lg"
          className="min-w-[120px] bg-red-600 text-white hover:bg-red-700"
        >
          Fail
        </Button>
      </div>
    </>
  )
}

function App() {
  const [screen, setScreen] = useState(SCREENS.dashboard)

  const activeNav =
    screen === SCREENS.dashboard
      ? 'dashboard'
      : screen === SCREENS.equipment || screen === SCREENS.detail
        ? 'equipment'
        : 'dashboard'

  const navigate = (next) => setScreen(next)

  return (
    <AppShell screen={screen} activeNav={activeNav} onNavigate={navigate}>
      {screen === SCREENS.dashboard && (
        <DashboardScreen onNavigate={navigate} />
      )}
      {screen === SCREENS.equipment && (
        <EquipmentScreen onNavigate={navigate} />
      )}
      {screen === SCREENS.detail && <DetailScreen onNavigate={navigate} />}
    </AppShell>
  )
}

export default App

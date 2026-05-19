import { useState } from 'react'
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Search,
  ShoppingCart,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

const QUICK_CHECK_QUESTIONS = [
  'Does this device pass the quick check criteria?',
  'Is the AED free of chirping or warning notifications?',
  'Does the AED appear to be undamaged and ready for use?',
  'Are the AED supplies present (CPR kit and electrode pads)?',
]

const DETAIL_DEVICE = {
  name: 'Cardiac Science Powerheart G5',
  model: 'Powerheart G5',
  serial: 'CS-G5-2024-00891',
  lot: 'LOT-2024-1182',
  sku: 'CS-G5-AED-WALL',
  location: 'Main Lobby',
  sitePlacement: 'Building A — Wall mount near reception',
  readiness: 'Ready',
  compliance: 'Compliant',
  inspectionDate: 'Mar 15, 2026',
}

const STATUS_CHECK_MODAL_DEVICE = {
  displayName: 'ZOLL AED PLUS',
  model: 'Cardiac Science Powerheart G5',
  serial: 'CS-G5-2024-00891',
  lot: '3351',
  sku: 'ABC-12345-S-BL',
  fields: [
    { label: 'Model', value: 'Cardiac Science Powerheart G5' },
    { label: 'Serial Number', value: 'CS-G5-2024-00891' },
    { label: 'Lot Number', value: '3351' },
    { label: 'SKU', value: 'ABC-12345-S-BL' },
    { label: 'Dates/Expirations', value: 'AUG 12 2023' },
    { label: 'Dates/Expirations', value: 'AUG 12 2023' },
  ],
}

const LAST_CHECK_DATE = 'May 18, 2026'

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

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

const ACCESSORIES_ROWS = [
  {
    manufacturer: 'Duracell 100X',
    type: 'Battery',
    lot: '3045666C',
    installed: 'Yes',
    expiration: 'Jul 26 2025 (1 year from now)',
    expirationClass: 'text-green-600',
  },
  {
    manufacturer: 'First Aid Cabinet',
    type: 'Cabinet',
    lot: '20230705A',
    installed: 'Yes',
    expiration: 'Jul 24 2024 (6 months overdue)',
    expirationClass: 'text-red-600',
  },
  {
    manufacturer: 'Heartsine Samaritan PAD 305P',
    type: 'Pads',
    lot: '444921338',
    installed: 'No',
    expiration: 'Jul 24 2024 (6 months overdue)',
    expirationClass: 'text-red-600',
  },
]

const SUPPORT_TICKETS_ROWS = [
  {
    description: 'AED Usage Event',
    date: 'April 30 2023',
    creator: 'William Robertson',
    status: 'Open',
  },
  {
    description: 'AED Usage Event',
    date: 'April 30 2023',
    creator: 'William Robertson',
    status: 'Open',
  },
  {
    description: 'AED Usage Event',
    date: 'April 30 2023',
    creator: 'William Robertson',
    status: 'Closed',
  },
]

const STATUS_CHECKS_HISTORY = [
  {
    timestamp: 'Apr 22 2024, 12:50pm EST',
    checkedBy: 'Jonathan Greenburg',
    source: 'Source',
    result: 'Pass',
    details: 'Details of the status check would go here',
  },
  {
    timestamp: 'Apr 22 2024, 12:50pm EST',
    checkedBy: 'Jonathan Greenburg',
    source: 'Source',
    result: 'Pass',
    details: 'Details of the status check would go here',
  },
  {
    timestamp: 'Apr 22 2024, 12:50pm EST',
    checkedBy: 'Jonathan Greenburg',
    source: 'Source',
    result: 'Pass',
    details: 'Details of the status check would go here',
  },
]

function GreenLink({ children, className }) {
  return (
    <span
      className={cn(
        'cursor-pointer font-medium text-green-600 hover:underline',
        className,
      )}
    >
      {children}
    </span>
  )
}

function DetailField({ label, children }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-0.5 text-sm">{children}</div>
    </div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    Pass: 'bg-green-100 text-green-800 border-green-200',
    'Needs Review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Fail: 'bg-red-100 text-red-800 border-red-200',
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Open: 'bg-green-100 text-green-800 border-green-200',
    Closed: 'bg-gray-100 text-gray-700 border-gray-200',
  }

  return (
    <Badge variant="outline" className={cn('border', styles[status])}>
      {status}
    </Badge>
  )
}

function TablePaginationFooter({ totalLabel }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
      <p className="text-sm text-muted-foreground">{totalLabel}</p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm" className="min-w-8">
          1
        </Button>
        <Button variant="ghost" size="sm" className="min-w-8">
          2
        </Button>
        <Button variant="ghost" size="sm" className="min-w-8">
          3
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}

function CardTableHeader({ title, actionLabel }) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
      <CardTitle className="text-sm font-semibold tracking-wide">
        {title}
      </CardTitle>
      {actionLabel && (
        <Button variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </CardHeader>
  )
}

function InspectionDueCell({ status, inspectionDue }) {
  return (
    <div className="flex flex-col gap-0.5">
      {status === 'Needs Review' && (
        <span className="text-xs font-semibold tracking-wide text-orange-600">
          DUE IN 3 DAYS
        </span>
      )}
      {status === 'Fail' && (
        <span className="text-xs font-semibold tracking-wide text-red-600">
          OVERDUE
        </span>
      )}
      <span>{inspectionDue}</span>
    </div>
  )
}

function NavIconButton({ icon: Icon, badge, label }) {
  return (
    <button
      type="button"
      className="relative text-gray-600 hover:text-gray-900"
      aria-label={label}
    >
      <Icon className="size-5" />
      <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
        {badge}
      </span>
    </button>
  )
}

function TopNav() {
  return (
    <header className="grid shrink-0 grid-cols-[auto_1fr_auto] items-center gap-6 border-b bg-white px-6 py-3">
      <div className="flex items-center gap-2">
        <span className="size-2 shrink-0 rounded-full bg-green-500" />
        <span className="text-lg font-bold tracking-tight lowercase">arch</span>
      </div>

      <div className="relative mx-auto w-full max-w-xl justify-self-center">
        <input
          type="search"
          placeholder="Search devices, locations..."
          className="h-9 w-full rounded-md border border-input bg-background py-2 pr-10 pl-3 text-sm placeholder:text-muted-foreground"
        />
        <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="flex items-center justify-end gap-5">
        <NavIconButton icon={Bell} badge={9} label="Notifications" />
        <NavIconButton icon={ShoppingCart} badge={9} label="Cart" />
        <Button className="rounded-md bg-yellow-400 px-4 font-semibold text-black hover:bg-yellow-500">
          STATUS CHECK
        </Button>
        <button
          type="button"
          className="flex items-center gap-2 text-gray-900 hover:opacity-80"
        >
          <span className="size-8 shrink-0 rounded-full bg-gray-300" />
          <span className="text-sm font-semibold tracking-wide">MARY LIN</span>
          <ChevronDown className="size-4 text-gray-500" />
        </button>
      </div>
    </header>
  )
}


function RegistrationStatusCard() {
  const columns = [
    { label: 'Agency Filing Status', status: 'Pass', link: 'VIEW FILING' },
    { label: 'Prescription Status', status: 'Pass', link: 'VIEW PRESCRIPTION' },
    { label: 'Response Plan', status: 'Pending', link: null },
  ]

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span className="size-4 rounded bg-gray-200" aria-hidden />
          REGISTRATION STATUS
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {columns.map((col) => (
          <div key={col.label} className="space-y-2">
            <p className="text-sm text-muted-foreground">{col.label}</p>
            <StatusBadge status={col.status} />
            {col.link && (
              <GreenLink className="block text-xs">{col.link}</GreenLink>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function AccessoriesCard() {
  return (
    <Card>
      <CardTableHeader title="ACCESSORIES & CONSUMABLES" actionLabel="ADD/REPLACE" />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Manufacturer & Model</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Lot</TableHead>
              <TableHead>Installed</TableHead>
              <TableHead>Expiration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ACCESSORIES_ROWS.map((row) => (
              <TableRow key={row.lot}>
                <TableCell className="font-medium">{row.manufacturer}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.lot}</TableCell>
                <TableCell>{row.installed}</TableCell>
                <TableCell className={cn('text-sm', row.expirationClass)}>
                  {row.expiration}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="border-t px-4 py-3">
          <p className="text-sm text-muted-foreground">Total 3 Items</p>
        </div>
      </CardContent>
    </Card>
  )
}

function SupportTicketsCard() {
  return (
    <Card>
      <CardTableHeader title="SUPPORT TICKETS" actionLabel="EXPORT" />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUPPORT_TICKETS_ROWS.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <GreenLink>{row.description}</GreenLink>
                </TableCell>
                <TableCell className="text-sm">{row.date}</TableCell>
                <TableCell className="text-sm">{row.creator}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell>
                  <GreenLink className="text-sm">VIEW</GreenLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePaginationFooter totalLabel="Total 55 Items" />
      </CardContent>
    </Card>
  )
}

function StatusChecksCard() {
  return (
    <Card>
      <CardTableHeader title="STATUS CHECKS" actionLabel="EXPORT" />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Checked By</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STATUS_CHECKS_HISTORY.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="whitespace-nowrap text-sm">
                  {row.timestamp}
                </TableCell>
                <TableCell className="text-sm">{row.checkedBy}</TableCell>
                <TableCell className="text-sm">{row.source}</TableCell>
                <TableCell>
                  <StatusBadge status={row.result} />
                </TableCell>
                <TableCell className="max-w-xs text-sm text-muted-foreground">
                  {row.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePaginationFooter totalLabel="Total 55 Items" />
      </CardContent>
    </Card>
  )
}

function DeviceImageCard() {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex h-48 w-full items-center justify-center rounded bg-gray-200 text-sm text-gray-500">
          Device Image
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-4" />
          </button>
          {[0, 1, 2].map((thumb) => (
            <div
              key={thumb}
              className="size-12 shrink-0 rounded bg-gray-200"
            />
          ))}
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
            aria-label="Next image"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

function Sidebar({ activeNav, onNavigate }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col bg-gray-900 text-white">
      <div className="border-b border-gray-800 px-4 py-4">
        <p className="text-xs text-gray-400">City University</p>
      </div>
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
                  ? 'bg-white font-medium text-gray-900'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white',
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
                <TableCell>
                  <InspectionDueCell
                    status={row.status}
                    inspectionDue={row.inspectionDue}
                  />
                </TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 bg-transparent text-green-600 hover:bg-green-50"
                      >
                        Pass
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 bg-transparent text-red-600 hover:bg-red-50"
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

function StatusCheckModal({ open, onOpenChange, outcome, onSubmit }) {
  const [checkedBy, setCheckedBy] = useState('Mary Lin')
  const [notes, setNotes] = useState('')
  const [answers, setAnswers] = useState(
    () => QUICK_CHECK_QUESTIONS.map(() => 'yes'),
  )

  const wordCount = countWords(notes)

  const handleNotesChange = (e) => {
    const next = e.target.value
    if (countWords(next) <= 100) setNotes(next)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ checkedBy, outcome })
    setNotes('')
    setAnswers(QUICK_CHECK_QUESTIONS.map(() => 'yes'))
    setCheckedBy('Mary Lin')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex max-h-[min(90vh,720px)] flex-col overflow-y-auto md:flex-row">
            <div className="w-full shrink-0 bg-gray-50 p-4 md:w-[280px]">
              <div className="mb-4 flex items-center gap-2">
                <Wrench className="size-4 shrink-0 text-gray-600" />
                <h3 className="text-xs font-bold tracking-wide text-gray-900 uppercase">
                  {STATUS_CHECK_MODAL_DEVICE.displayName}
                </h3>
              </div>
              <div className="mb-4 h-48 w-full rounded bg-gray-200" />
              <div className="grid grid-cols-2 gap-4">
                {STATUS_CHECK_MODAL_DEVICE.fields.map((field, index) => (
                  <div key={`${field.label}-${index}`}>
                    <p className="text-xs text-gray-500">{field.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-gray-900">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex-1">
                {QUICK_CHECK_QUESTIONS.map((question, index) => (
                  <fieldset key={question} className="mb-6">
                    <legend className="mb-2 text-sm font-bold text-gray-900">
                      {question}
                    </legend>
                    <div className="flex gap-6">
                      {[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                      ].map(({ value, label }) => (
                        <label
                          key={value}
                          className="flex cursor-pointer items-center gap-2 text-sm"
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={value}
                            checked={answers[index] === value}
                            onChange={() => {
                              const next = [...answers]
                              next[index] = value
                              setAnswers(next)
                            }}
                            className="size-4 accent-gray-900"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
                <div className="mt-6 space-y-2">
                  <Label htmlFor="checked-by">Checked By</Label>
                  <Input
                    id="checked-by"
                    value={checkedBy}
                    onChange={(e) => setCheckedBy(e.target.value)}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={handleNotesChange}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    {wordCount} / 100 words
                  </p>
                </div>
              </div>
              <Button
                type="submit"
                className="mt-6 w-full bg-gray-900 text-white hover:bg-gray-800"
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


function DetailScreen({ onNavigate }) {
  const [status, setStatus] = useState('Pass')
  const [lastCheck, setLastCheck] = useState({
    result: 'Pass',
    date: 'May 10, 2026',
    by: 'Mary Lin',
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [checkOutcome, setCheckOutcome] = useState('Pass')

  const openQuickCheck = (outcome) => {
    setCheckOutcome(outcome)
    setModalOpen(true)
  }

  const handleSubmitCheck = ({ checkedBy, outcome }) => {
    setStatus(outcome)
    setLastCheck({
      result: outcome,
      date: LAST_CHECK_DATE,
      by: checkedBy,
    })
    setModalOpen(false)
  }

  const fields = [
    { label: 'Location', value: DETAIL_DEVICE.location },
    { label: 'Site & Placement', value: DETAIL_DEVICE.sitePlacement },
    { label: 'Serial', value: DETAIL_DEVICE.serial },
    { label: 'Status', value: <StatusBadge status={status} /> },
    { label: 'Readiness Status', value: DETAIL_DEVICE.readiness },
    { label: 'Compliance Status', value: DETAIL_DEVICE.compliance },
    { label: 'Inspection Date', value: DETAIL_DEVICE.inspectionDate },
    {
      label: 'Last Check',
      value: `${lastCheck.date} — ${lastCheck.by}`,
    },
  ]

  return (
    <>
      <p className="mb-2 text-sm text-muted-foreground">
        Equipment / Inspectable Equipment / Device Detail
      </p>
      <h1 className="mb-6 text-2xl font-semibold">{DETAIL_DEVICE.name}</h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <DeviceImageCard />
          <Card>
            <CardContent className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
              {fields.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-sm font-medium">{value}</dd>
                </div>
              ))}
            </CardContent>
          </Card>

          <RegistrationStatusCard />
          <AccessoriesCard />
          <SupportTicketsCard />
          <StatusChecksCard />
        </div>

        <div className="flex w-full shrink-0 flex-col gap-4 lg:w-[280px]">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold tracking-wide">
                STATUS CHECK
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full bg-green-600 text-white hover:bg-green-700"
                onClick={() => openQuickCheck('Pass')}
              >
                PASS QUICK CHECK
              </Button>
              <Button
                className="w-full bg-red-600 text-white hover:bg-red-700"
                onClick={() => openQuickCheck('Fail')}
              >
                FAIL QUICK CHECK
              </Button>
              <Button variant="outline" className="w-full">
                FULL STATUS CHECK
              </Button>
              <div className="space-y-2 border-t pt-4">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Last Check
                </p>
                <StatusBadge status={lastCheck.result} />
                <p className="text-sm">{lastCheck.date}</p>
                <p className="text-sm text-muted-foreground">
                  Checked by {lastCheck.by}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                <Globe className="size-4 text-muted-foreground" />
                ORGANIZATION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailField label="Organization">
                <GreenLink>City University</GreenLink>
              </DetailField>
              <DetailField label="ERP ID">
                <span className="font-medium">199292929</span>
              </DetailField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold tracking-wide">
                LOCATION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex h-24 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                Map
              </div>
              <DetailField label="Location">
                <GreenLink>State University</GreenLink>
              </DetailField>
              <DetailField label="Site">
                <GreenLink>Health Building</GreenLink>
              </DetailField>
              <DetailField label="Placement">
                <span className="font-medium">3rd Floor Gym</span>
              </DetailField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold tracking-wide">
                ASSOCIATED USERS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailField label="Primary Contact">
                <GreenLink>Sandra Hernandez</GreenLink>
              </DetailField>
              <DetailField label="Coordinator">
                <GreenLink>Eduardo Costanza</GreenLink>
              </DetailField>
              <DetailField label="Responders">
                <div className="flex flex-col gap-1">
                  <GreenLink>James Turell</GreenLink>
                  <GreenLink>Hal Park</GreenLink>
                </div>
              </DetailField>
              <DetailField label="Instructor">
                <GreenLink>Carol Smith</GreenLink>
              </DetailField>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={() => onNavigate(SCREENS.equipment)}>
          Back
        </Button>
      </div>

      <StatusCheckModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        outcome={checkOutcome}
        onSubmit={handleSubmitCheck}
      />
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

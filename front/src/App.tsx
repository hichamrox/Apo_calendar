import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import useFetch from './hooks/useFetch'
import { useEffect, useState } from 'react'

import type { Staff, Appointment, ElementList } from './types'
import AddAppointementDialog from '#modals/AddAppointementDialog'
import ShowAppointementDialog from '#modals/ShowAppointementDialog'


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedDates, setSelectedDates] = useState<{
    start: string,
    end: string
  }>()

  const { data, error } = useFetch<Appointment[]>('/api/appointments');

  const { data: clients, error: errorClients } = useFetch<ElementList[]>('/api/clients');
  const { data: staff, error: errorStaff } = useFetch<Staff[]>('/api/staffs');


  const [events, setEvents] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();


  useEffect(() => {
    if (data && !error) setEvents(data)
  }, [data, error])

  if (error || errorClients || errorStaff) {
    console.warn(error || errorClients || errorStaff)
    return null
  } else if (!data || !clients || !staff) {
    return <div>Loading...</div>
  }


  const addEvent = (event: Appointment) => {
    setEvents((ev) => [...ev, event])
  }

  const deleteEvent = (id: string) => {
    setEvents((ev) => [...ev.filter((e) => e.id !== id)])
  }
  return (
    <div className='p-2'>
      <AddAppointementDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        clients={clients}
        staff={staff.map((s) => ({
          id: s.id,
          name: `${s.firstName} ${s.lastName}`
        }))}
        selectedDates={selectedDates}
        setEvents={addEvent}
      />

      <ShowAppointementDialog
        isOpen={selectedAppointment !== undefined}
        closeModal={() => setSelectedAppointment(undefined)}
        appointment={selectedAppointment!}
        onDeleted={deleteEvent}
      />



      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}

        events={events.map(appointment => ({
          id: appointment.id,
          title: appointment.title,
          start: appointment.startDate,
          end: appointment.endDate,
        }))}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '09:00',
          endTime: '18:00',
        }}

        slotMinTime="08:00"
        slotMaxTime="19:00"
        editable
        selectable
        selectMirror
        weekends={false}
        select={function (arg) {
          setIsOpen(true)

          setSelectedDates({
            start: arg.startStr,
            end: arg.endStr
          })
        }}

        eventClick={function (arg) {
          const aptId = arg.event.id;

          const appointment = events.find((ev) => ev.id === aptId)

          if (appointment) {
            setSelectedAppointment(appointment)
          }
        }}

        eventChange={async function (arg) {
          const aptId = arg.event.id;

          const payload = {
            startDate: arg.event.startStr,
            endDate: arg.event.endStr,
          }

          const response = await fetch(`/api/appointments/${aptId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            return
          }
        }}
      />
    </div>
  )
}

export default App

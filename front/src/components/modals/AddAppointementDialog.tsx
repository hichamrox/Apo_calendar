import type { Appointment, ElementList } from '@/types'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import AppListbox from '#listbox/AppListBox'

export default function AddAppointementDialog({
    isOpen,
    setIsOpen,
    clients,
    staff,
    selectedDates,
    setEvents
}: {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    setEvents: (ev: Appointment) => void,
    clients: ElementList[],
    staff: ElementList[],
    selectedDates?: {
        start: string,
        end: string
    }
}) {

    const [payload, setPayload] = useState({
        clientId: clients[0]?.id || "",
        staffId: staff[0]?.id || "",
        title: "",
        startDate: "",
        endDate: "",
        description: ""
    })

    function closeModal() {
        setIsOpen(false)
    }

    async function handleSubmit() {
        const p = {
            ...payload,
            startDate: selectedDates?.start,
            endDate: selectedDates?.end,
        }
        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p)
        });

        if (response.ok) {
            closeModal();

            const json = await response.json();

            setEvents(json)
            return
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add an appointment
                                </Dialog.Title>
                                <div className="flex flex-col space-y-2">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="w-full text-lg leading-6 bg-white border border-gray-300 rounded-xl disabled:text-slate-500 disabled:border-slate-200 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-0 px-4 py-3"
                                            onChange={(e) => setPayload((p) => ({
                                                ...p,
                                                title: e.target.value
                                            }))}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="desc"
                                            id="desc"
                                            className="w-full text-lg leading-6 bg-white border border-gray-300 rounded-xl disabled:text-slate-500 disabled:border-slate-200 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-0 px-4 py-3"
                                            onChange={(e) => setPayload((p) => ({
                                                ...p,
                                                description: e.target.value
                                            }))}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="title4" className="block text-sm font-medium text-gray-700">
                                            Client
                                        </label>
                                        <AppListbox
                                            elements={clients}
                                            defaultElement={clients[0]}
                                            onChange={
                                                (selectedClient) => setPayload((p) => ({
                                                    ...p,
                                                    clientId: selectedClient.id
                                                }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="title2" className="block text-sm font-medium text-gray-700">
                                            Staff
                                        </label>
                                        <AppListbox elements={staff} defaultElement={staff[0]}
                                            onChange={(selectedStaff) => setPayload((p) => ({
                                                ...p,
                                                staffId: selectedStaff.id
                                            }))
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleSubmit}
                                    >
                                        Create appointment
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
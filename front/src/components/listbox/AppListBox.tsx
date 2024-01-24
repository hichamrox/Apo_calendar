import type { ElementList } from '@/types'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import CheckIcon from '#icons/CheckIcon'
import ChevronUpDownIcon from '#icons/ChevronUpDownIcon'

export default function AppListbox({
    elements,
    defaultElement,
    onChange
}: {
    elements: ElementList[],
    defaultElement: ElementList
    onChange: (element: ElementList) => void
}) {
    const [selected, setSelected] = useState(defaultElement)

    const handleOnSelect = (element: ElementList) => {
        setSelected(element)
        onChange(element)

        console.log(element)
    }
    return (
        <div className="relative">
            <Listbox value={selected} onChange={handleOnSelect}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="max-h-60 overflow-y-auto mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {elements.map((el) => (
                                <Listbox.Option
                                    key={el.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-sky-100 text-sky-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={el}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {el.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                                                    <CheckIcon />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
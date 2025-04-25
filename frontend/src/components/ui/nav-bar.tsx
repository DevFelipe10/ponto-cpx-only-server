import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Skeleton } from './skeleton'
import { useEffect, useState } from 'react'
import { CircleUser } from 'lucide-react'
import { Profile, useApiAuth } from '@/hooks/use-api-auth'
import { useConfig } from '@/hooks/use-config'

interface NavigationItem {
  name: string
  href: string
  current: boolean
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/#/dashboard', current: false },
  { name: 'Adicionar Face', href: '/#/adicionarfaces', current: false },
  { name: 'Registrar Ponto', href: '/#/registrarponto', current: false },
]

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar(): JSX.Element {
  const { getConfgiMisterT, configMisterT } = useConfig()
  const { getProfile } = useApiAuth()

  const [profile, setProfile] = useState<Profile>()
  const [loadProfile, setLoadProfile] = useState<boolean>(true)
  const [loadConfigMisterT, setLoadConfigMisterT] = useState<boolean>(true)

  useEffect(() => {
    navigation.forEach(element => {
      element.current = false

      if (element.href === `/${window.location.hash}`) {
        element.current = true
      }
    })

    if (loadConfigMisterT) {
      setLoadConfigMisterT(false)
      getConfgiMisterT()

      if (loadProfile) {
        setLoadProfile(false)
        getProfile().then(p => {
          setProfile(p.data)
        })
      }
    }
  }, [getConfgiMisterT, getProfile, loadConfigMisterT, loadProfile])

  return (
    <Disclosure as="nav" className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 hover:bg-primary hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {configMisterT === undefined ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <img
                  alt="Your Company"
                  src={configMisterT?.URL_Img_Logo}
                  className="h-8 w-16"
                />
              )}
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map(item => {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current
                          ? 'bg-primary text-white hover:text-white'
                          : 'text-primary hover:bg-primary hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-100 p-1 text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}

            <div className="hidden sm:block">
              {profile === undefined ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <h2 className="text-primary rounded-md px-3 py-2 text-sm font-medium ">
                  {profile.username}
                </h2>
              )}
            </div>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-100 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <CircleUser className="text-primary size-8 rounded-full" />
                  {/* <img
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  /> */}
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-none">
                {/* <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-primary',
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-primary',
                      )}
                    >
                      Settings
                    </a>
                  )}
                </MenuItem> */}
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="/"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-primary',
                      )}
                    >
                      Sair
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map(item => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-primary text-white'
                  : 'text-primary  hover:bg-primary hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

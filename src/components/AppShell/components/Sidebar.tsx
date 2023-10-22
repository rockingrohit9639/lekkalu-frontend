import React from 'react'
import { Link } from 'react-router-dom'
import { LogOutIcon } from 'lucide-react'
import { cn } from '@/utils/utils'
import NavLink from './NavLink'
import { ROUTES } from '@/utils/app-shell'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/hooks/use-auth'
import When from '@/components/When/When'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...restProps }: SidebarProps) {
  const { userData, logout } = useAuthContext()

  return (
    <div className={cn('border-r h-full', className)} {...restProps}>
      <div className='space-y-4 py-4 h-full flex flex-col justify-between px-3'>
        <div>
          <h1 className='text-center text-2xl font-bold text-primary'>finuncle</h1>

          <div className='space-y-1  py-2'>
            {ROUTES.map((route) => (
              <NavLink key={route.path} to={route.path} label={route.label} icon={route.icon} />
            ))}
          </div>
        </div>

        <When truthy={Boolean(userData)}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>@{userData?.username}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <When truthy={Boolean(userData?.email)}>
                <DropdownMenuLabel>{userData?.email}</DropdownMenuLabel>
              </When>

              <DropdownMenuItem className='cursor-pointer' asChild>
                <Link to='/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                <LogOutIcon className='mr-2 h-4 w-4' />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </When>
      </div>
    </div>
  )
}

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router';
import useRole from '../../../hooks/useRole';

function ElementsDropdownsWithSimpleHeader() {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();
  if (roleLoading) return (
    <span className="loading loading-spinner loading-lg text-primary"></span>
  ); 

  return (
    <Menu as="div" className="relative inline-block bg-primary rounded-lg">
      <MenuButton className="inline-flex w-full cursor-pointer justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
        Hello!! {user.displayName}
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 size-5 text-gray-400"
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="px-4 py-3">
          <p className="text-sm text-gray-400">Signed in as</p>
          <p className="truncate text-sm font-medium text-white">
            {user.email}
          </p>
        </div>
        <div className="py-1">
          <MenuItem>
            <Link
              to={"/dashboard/my-profile"}
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Account
            </Link>
          </MenuItem>
          {role === "student" && (
            <MenuItem>
              <Link
                to={"/dashboard/my-applications"}
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
              >
                Your Applications
              </Link>
            </MenuItem>
          )}
          {role === "moderator" && (
            <MenuItem>
              <Link
                to={"/dashboard/manage-applications"}
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
              >
                Manage Students Applications
              </Link>
            </MenuItem>
          )}
          {(role === "admin" || role === "super-admin") && (
            <MenuItem>
              <Link
                to={"/dashboard/manage-users"}
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
              >
                Manage All User
              </Link>
            </MenuItem>
          )}
        </div>
        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => logOut()}
              type="submit"
              className="block w-full px-4 py-2 text-left cursor-pointer text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
export {ElementsDropdownsWithSimpleHeader as DropDown}
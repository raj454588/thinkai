
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu, User, LogOut, ShieldCheck, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export function NavMenu() {
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isAdmin = user?.username === 'admin';

  if (isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">Chat</Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
            <Link href="/developers">Developers</Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
            <Link href="/about">About Us</Link>
          </DropdownMenuItem>
          {isAuthenticated ? (
             <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sign-up">Sign Up</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <nav className="flex items-center gap-2">
        <Button variant="ghost" asChild>
            <Link href="/" >
                Chat
            </Link>
        </Button>
        <Button variant="ghost" asChild>
            <Link href="/developers" >
                Developers
            </Link>
        </Button>
         <Button variant="ghost" asChild>
            <Link href="/about" >
                About Us
            </Link>
        </Button>
      {isAuthenticated ? (
        <>
          {isAdmin && (
            <Button variant="ghost" asChild>
                <Link href="/admin" className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    Admin Panel
                </Link>
            </Button>
          )}
           <Button variant="ghost" asChild>
                <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                </Link>
            </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className='gap-2'>
                <User className="h-5 w-5" />
                <span>{user?.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </>
      )}
    </nav>
  );
}

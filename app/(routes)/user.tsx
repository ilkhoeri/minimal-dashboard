import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";

export async function User() {
  let session = await auth();
  let user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {user?.image ? (
            <Image
              src={user?.image}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          ) : (
            <PersonIcon
              width={20}
              height={20}
              className="text-muted-foreground"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session && (
          <>
            <DropdownMenuItem className="p-0">
              <Link
                href={`/dashboard/${session?.user.id}`}
                className="size-full px-2 py-1.5"
              >
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Link
                href={`/${session?.user.id}/products`}
                className="size-full px-2 py-1.5"
              >
                My Products
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem className="p-0">
            <form
              className="size-full"
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="size-full px-2 py-1.5 text-start"
              >
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="p-0">
            <Link href="/auth/sign-in" className="size-full px-2 py-1.5">
              Sign In
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

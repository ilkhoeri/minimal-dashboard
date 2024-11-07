"use client";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Session } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { classInput, Input } from "@/components/ui/input";

import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandX,
  IconCloudUpload,
  IconDeviceImac,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceTv
} from "@tabler/icons-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from "@/components/ui/form";

export function SettingsPage({ session }: Session) {
  if (!session) {
    return null;
  }
  return (
    <div className="gap-4 grid grid-flow-row md:grid-flow-col md:grid-cols-3">
      <div className="space-y-4 col-span-1 md:col-auto">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <ChangeImageForm session={session} />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-xl mb-4">Language & Time</h3>
          <LanguageTimeForm />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-xl mb-4">Social accounts</h3>
          <SocialAccountsForm socmed={socialAccounts} />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-xl mb-4">Other accounts</h3>
          <OtherAccounts account={cookieAccounts} />
        </div>
      </div>

      <div className="space-y-4 md:col-span-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-xl mb-4">General information</h3>
          <SettingsAccountForm session={session} />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-xl mb-4">Password information</h3>
          <PasswordForm session={session} />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-xl mb-4">Sessions</h3>
          <SessionsActive active={sessionActive} />
        </div>
      </div>
    </div>
  );
}

function ChangeImageForm({ session }: Session) {
  return (
    <>
      <div className="mb-4 relative flex items-center md:block size-28 aspect-square">
        <Image
          fill
          alt=""
          src={session?.image || "/images/pict-user.svg"}
          className="md:mb-4 rounded-lg align-middle object-cover"
        />
      </div>

      <div className="flex flex-col">
        {session?.name && (
          <h3 className="font-bold text-2xl mb-1">{session.name}</h3>
        )}
        <p className="text-muted-foreground font-normal text-base">
          Software Engineer
        </p>

        <Button
          size="sm"
          className="w-max transition-all active:scale-[0.99] mt-6"
        >
          <IconCloudUpload className="size-5 mr-2" />
          Change picture
        </Button>
      </div>
    </>
  );
}

function LanguageTimeForm({}: {}) {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <>
      <form action="" className="flex flex-col [&_label]:mt-4 [&_select]:mt-2">
        <label
          htmlFor="settings-language"
          className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Select language
        </label>
        <select
          aria-label="settings language"
          name="settings-language"
          id="settings-language"
          disabled={disabled}
          className={classInput()}
        >
          <option value="en-US">English (US)</option>
          <option value="Italiano">Italiano</option>
          <option value="Français (France)">Français (France)</option>
          <option value="正體字">正體字</option>
          <option value="Español (España)">Español (España)</option>
          <option value="Deutsch">Deutsch</option>
          <option value="Português (Brasil)">Português (Brasil)</option>
        </select>

        <label
          htmlFor="settings-timezone"
          className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Time Zone
        </label>
        <select
          aria-label="settings timezone"
          name="settings-timezone"
          id="settings-timezone"
          disabled={disabled}
          className={classInput()}
        >
          <option value="GMT+0(GMT)">GMT+0 Greenwich Mean Time (GMT)</option>
          <option value="GMT+1(CET)">GMT+1 Central European Time (CET)</option>
          <option value="GMT+3(MSK)">GMT+3 Moscow Time (MSK)</option>
          <option value="GMT+5(PKT)">GMT+5 Pakistan Standard Time (PKT)</option>
          <option value="GMT+8(CST)">GMT+8 China Standard Time (CST)</option>
          <option value="GMT+10(AEST)">
            GMT+10 Eastern Australia Standard Time (AEST)
          </option>
        </select>

        <Button
          size="sm"
          className="w-max transition-all active:scale-[0.99] mt-6"
        >
          Save
        </Button>
      </form>
    </>
  );
}

const socialAccounts = [
  {
    id: "1",
    label: "Facebook",
    link: "https://facebook.com",
    connected: true,
    icon: IconBrandFacebook
  },
  {
    id: "2",
    label: "X",
    link: "https://x.com",
    connected: true,
    icon: IconBrandX
  },
  {
    id: "3",
    label: "Github",
    link: "",
    connected: false,
    icon: IconBrandGithub
  },
  {
    id: "4",
    label: "Dribbble",
    link: "",
    connected: false,
    icon: IconBrandDribbble
  }
];

type Socmed = {
  id: string;
  label: string;
  link: string;
  connected: boolean;
  icon: any;
}[];

function SocialAccountsForm({ socmed }: { socmed: Socmed | null }) {
  if (!socmed) {
    return null;
  }
  return (
    <>
      <ul className="divide-y">
        {socmed.map((i) => (
          <li
            key={i.id}
            className="flex flex-row items-center py-4 gap-4 w-full max-w-full"
          >
            <div className="flex-shrink-0 [--sz:22px] size-[--sz]">
              {i?.icon && (
                <i.icon className="size-[--sz] min-w-[--sz] min-h-[--sz]" />
              )}
            </div>

            <div className="flex flex-col max-w-[42.5%]">
              <span className="text-base font-semibold truncate">
                {i.label}
              </span>
              {i.link ? (
                <Link
                  href={i.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm font-normal truncate"
                >
                  {i.link.replace("https://", "")}
                </Link>
              ) : (
                <span className="text-muted-foreground text-sm font-normal truncate">
                  Not connected
                </span>
              )}
            </div>

            <Button
              size="sm"
              variant={i.connected ? "default" : "outline"}
              className="w-max transition-all active:scale-[0.99] ml-auto"
            >
              {i.connected ? "Disconnect" : "Connect"}
            </Button>
          </li>
        ))}
      </ul>

      <Button
        size="sm"
        className="w-max transition-all active:scale-[0.99] mt-6"
      >
        Save
      </Button>
    </>
  );
}

const cookieAccounts = [
  {
    id: "1",
    name: "Jane Doe",
    email: "janedoe@mail.com",
    image: "/images/dummy/7c9062905b4ce3d276dfffd2b34bbb49.png"
  },
  {
    id: "2",
    name: "Jeny Doe",
    email: "jenydoe123@mail.com",
    image: "/images/dummy/6914da7a3557e685836a71e635c237b9.png"
  },
  {
    id: "3",
    name: "Thomas Lean",
    email: "thomas.lean@mail.com",
    image: "/images/dummy/119d9abaee7a1e987571f0fe776bd1a5.png"
  }
];

type CookieAccounts = {
  id: string;
  name: string;
  email: string;
  image: string | null;
}[];

function OtherAccounts({ account }: { account: CookieAccounts | null }) {
  if (!account) {
    return null;
  }
  return (
    <ul className="divide-y w-full grid">
      {account.map((i) => (
        <li
          key={i.id}
          className="flex flex-col items-center py-4 gap-4 w-full max-w-full"
        >
          <div className="flex-shrink-0 w-full flex flex-row items-center gap-4">
            <div className="flex-shrink-0 relative [--sz:32px] size-[--sz] min-w-[--sz] min-h-[--sz] border rounded-full">
              <Image
                fill
                alt=""
                src={i?.image || "/images/pict-user2.svg"}
                className="rounded-full align-middle object-cover"
              />
            </div>

            <div className="flex flex-col max-w-[72.5%]">
              <p className="font-semibold text-base truncate">{i.name}</p>
              <p className="font-normal text-sm truncate text-muted-foreground">
                {i.email}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full flex flex-row items-center gap-4">
            <Button
              size="sm"
              variant="outline"
              className="w-full transition-all active:scale-[0.99]"
            >
              Switch
            </Button>

            <Button
              size="sm"
              variant="default"
              className="w-full transition-all active:scale-[0.99]"
            >
              Logout
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SettingsAccountForm({ session }: Session) {
  const [disabled, setDisabled] = React.useState(false);

  if (!session) return null;

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <form className="[&_input]:mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="first-name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            First Name
          </label>
          <Input
            id="first-name"
            name="first-name"
            placeholder="John"
            disabled={disabled}
            value={session.name}
          />
        </div>

        <div>
          <label
            htmlFor="last-name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Last Name
          </label>
          <Input
            id="last-name"
            name="last-name"
            placeholder="Doe"
            disabled={disabled}
            value={session.alias}
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Country
          </label>
          <Input
            id="country"
            name="country"
            placeholder="e.g.United States"
            disabled={disabled}
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            City
          </label>
          <Input
            id="city"
            name="city"
            placeholder="e.g. San Francisco"
            disabled={disabled}
          />
        </div>

        <div>
          <label
            htmlFor="adress"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Adress
          </label>
          <Input
            id="adress"
            name="adress"
            placeholder="e.g. California"
            disabled={disabled}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. johndoe@mail.com"
            disabled={disabled}
            value={session.email}
          />
        </div>
        {/*  */}
        <div>
          <label
            htmlFor="phone-number"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Phone Number
          </label>
          <Input
            type="tel"
            id="phone-number"
            name="phone-number"
            placeholder="e.g. (+00) 123 4567 8900"
            disabled={disabled}
          />
        </div>

        <div>
          <label
            htmlFor="birthday"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Birthday
          </label>
          <Input
            type="date"
            id="birthday"
            name="birthday"
            placeholder="e.g. 15/08/1990"
            disabled={disabled}
            value={formatDate(new Date(session.birth))}
          />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Organization
          </label>
          <Input
            id="organization"
            name="organization"
            placeholder="e.g. Company"
            disabled={disabled}
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Role
          </label>
          <Input
            id="role"
            name="role"
            placeholder="e.g. React Developer"
            disabled={disabled}
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Department
          </label>
          <Input
            id="department"
            name="department"
            placeholder="e.g. Development"
            disabled={disabled}
          />
        </div>

        <div>
          <label
            htmlFor="zip-code"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Zip/postal code
          </label>
          <Input
            type="number"
            id="zip-code"
            name="zip-code"
            placeholder="e.g. 123456"
            disabled={disabled}
          />
        </div>
      </div>

      <Button
        size="sm"
        className="w-max transition-all active:scale-[0.99] mt-6"
      >
        Save
      </Button>
    </form>
  );
}

function PasswordForm({ session }: Session) {
  const [disabled, setDisabled] = React.useState(false);

  if (!session) return null;

  return (
    <form className="[&_input]:mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="current-password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Current password
          </label>
          <Input
            required
            id="current-password"
            name="current-password"
            placeholder="••••••••"
            disabled={disabled}
          />
        </div>
        <div className="max-md:hidden max-md:sr-only" />

        <div>
          <label
            htmlFor="new-password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            New password
          </label>
          <Input
            id="new-password"
            name="new-password"
            placeholder="••••••••"
            disabled={disabled}
            value={session.alias}
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Confirm password
          </label>
          <Input
            id="confirm-password"
            name="confirm-password"
            placeholder="••••••••"
            disabled={disabled}
          />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <span className="font-medium text-sm">Password requirements:</span>
          <span className="font-normal text-sm mb-1 text-muted-foreground">
            Ensure that these requirements are met:
          </span>
          <ul className="pl-2 max-w-full list-inside list-disc">
            <li className="font-normal text-xs truncate">
              At least 10 characters (and up to 100 characters)
            </li>
            <li className="font-normal text-xs truncate">
              At least one lowerchase character
            </li>
            <li className="font-normal text-xs truncate">
              At least one upperchase character
            </li>
            <li className="font-normal text-xs truncate">
              At least one number
            </li>
            <li className="font-normal text-xs truncate">
              Inclusion of at least one special character, e.g., ! @ # ?
            </li>
          </ul>
        </div>
      </div>

      <Button
        size="sm"
        className="w-max transition-all active:scale-[0.99] mt-6"
      >
        Save
      </Button>
    </form>
  );
}

const sessionActive = [
  {
    id: "1",
    address: "California 123.123.123.123",
    device: "Chrome on macOS",
    lastSeen: new Date("2024-11-06T16:40:38.670Z"),
    icon: IconDeviceImac
  },
  {
    id: "2",
    address: "New York 234.234.234.234",
    device: "Safari on iPhone",
    lastSeen: new Date("2024-11-06T15:20:38.670Z"),
    icon: IconDeviceMobile
  },
  {
    id: "3",
    address: "Texas 345.345.345.345",
    device: "Firefox on Android Tablet",
    lastSeen: new Date("2024-11-06T14:10:38.670Z"),
    icon: IconDeviceTablet
  },
  {
    id: "4",
    address: "Seattle 456.456.456.456",
    device: "YouTube on Smart TV",
    lastSeen: new Date("2024-11-06T13:00:38.670Z"),
    icon: IconDeviceTv
  }
];

type sessionActive = {
  id: string;
  address: string;
  device: string;
  lastSeen: Date;
  icon: any;
}[];

function SessionsActive({ active }: { active: sessionActive | null }) {
  if (!active) {
    return null;
  }

  return (
    <>
      <ul className="divide-y">
        {active.map((i) => (
          <li
            key={i.id}
            className="flex flex-row items-center py-4 gap-4 w-full max-w-full"
          >
            <div className="flex-shrink-0 [--sz:32px] size-[--sz]">
              {i?.icon && (
                <i.icon className="size-[--sz] min-w-[--sz] min-h-[--sz]" />
              )}
            </div>

            <div className="flex flex-col max-w-[72.5%]">
              <p className="font-semibold text-base truncate">{i.address}</p>
              <p className="font-normal text-sm truncate text-muted-foreground">
                {i.device}
              </p>
              <time
                suppressHydrationWarning
                dateTime={String(i.lastSeen)}
                className="font-normal text-sm truncate text-muted-foreground"
              >
                {String(i.lastSeen)}
              </time>
            </div>

            <Button
              size="sm"
              className="w-max transition-all active:scale-[0.99] ml-auto"
            >
              Revoke
            </Button>
          </li>
        ))}
      </ul>

      <Button
        size="sm"
        variant="outline"
        className="w-max transition-all active:scale-[0.99] mt-6"
      >
        See More
      </Button>
    </>
  );
}

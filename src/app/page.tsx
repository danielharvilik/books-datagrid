"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Card, CardContent } from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import BookTable from "./books/page";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BookDataEntryForm from "./book-data-entry-form/page";

export default function Home() {
  return (
    <>
      <NavigationMenu className="max-w-full p-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create new entry</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <BookDataEntryForm />
              </DialogContent>
            </Dialog>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <section className="p-4">
        <BookTable />
      </section>
      <footer>
        <Card className="flex flex-col justify-center items-center rounded-none shadow-none border-transparent">
          <CardContent className="pb-0">
            <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto  lg:justify-between">
              <div className="flex justify-center space-x-4 lg:mt-0">
                <Link href={"https://github.com/danielharvilik/books-datagrid"}>
                  <GitHubLogoIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </footer>
    </>
  );
}

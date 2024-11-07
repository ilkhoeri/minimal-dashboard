"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconFileDownload, IconFileTypePdf } from "@tabler/icons-react";
import generatePDF, { Resolution, Margin, Options, usePDF } from "react-to-pdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function DownloadFiles({
  fileName = "document",
  targetRefOrFunction
}: {
  fileName?: string;
  targetRefOrFunction: React.MutableRefObject<any> | (() => HTMLElement | null);
  onClick?: () => void;
}) {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  // const { toPDF, targetRef } = usePDF({ filename: "curricullum.pdf" });

  React.useEffect(() => {
    if (disabled) {
      setTimeout(() => {
        setDisabled(false);
      }, 5500);
    }
  }, [disabled]);

  const options: Options = {
    filename: `${fileName}.pdf`,
    // default is `save`
    method: "save",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.MEDIUM,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // Default is "A4". If you want to use your own format just pass instead of one of the above predefined formats the size as an number-array, e.g. [595.28, 841.89] (in mm, not px) 1mm = 3.779527559055118 px
      format: "A4",
      // default is 'portrait'
      orientation: "portrait"
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/jpeg",
      qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger tabIndex={-1} asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1 select-none focus-visible:ring-transparent"
        >
          <IconFileDownload className="size-5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>File Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="w-full">
            <button
              type="button"
              disabled={disabled}
              data-html2canvas-ignore
              onClick={(e) => {
                generatePDF(targetRefOrFunction, options);
                setDisabled(true);
              }}
            >
              <IconFileTypePdf className="size-5 min-h-5 min-w-5" />
              <span className="w-[calc(100%-0.5rem)] ml-2 font-medium text-sm text-left line-clamp-1">
                {fileName}.pdf
              </span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

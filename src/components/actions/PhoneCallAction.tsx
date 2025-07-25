'use client';

import { PhoneOutgoing } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from 'next/image'
const PhoneCallAction = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full text-green-600 dark:text-green-400 border-green-400 dark:border-blue-900 hover:bg-green-100 dark:hover:bg-green-400/30"
        >
          <PhoneOutgoing className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-gray-950 rounded-4xl ' >
          

           <Image
      src="/D1.jpg"
      alt="Picture of the author"
      width={500}
      height={500}
      className='rounded-3xl mask-conic-to-popover'
    />



      </DialogContent>
    </Dialog>
  );
};

export default PhoneCallAction;

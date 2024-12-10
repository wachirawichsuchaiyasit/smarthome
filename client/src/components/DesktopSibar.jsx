import { Box, Text, Link, Button, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
export default function DesktopSidebar() {
  return (
    <>
<div className="bg-gray-100 flex items-center justify-between p-4">
            <Image
                 src=" img/imghome/logo.png"
            />

            <Button variant="light" onClick={onOpen}>
            <Icon icon="ph:list-bold" width="28" height="28" />
            </Button>






    
     <BoxHeader className="flex flex-col gap-1">
              <Image
                 src=" img/imghome/logo.png"
            />
              </BoxHeader>

      <Box className="flex flex-col items-center p-8">
                <Button variant="light" size="lg" className="w-fit font-bold">
                        <Icon icon="ic:round-home" width="28" height="28" />
                        Home
                </Button>
    </Box>  

        <Box className="flex flex-col items-center p-8">
                <Button variant="light" size="lg" className="w-fit font-bold">
                        <Icon icon="ic:round-home" width="28" height="28" />
                        Home
                </Button>
                </Box>
                <Box className="flex flex-col items-center p-8">
                <Button variant="light" size="lg" className="w-fit font-bold">
                        <Icon icon="ic:round-home" width="28" height="28" />
                        Home
                </Button>
    </Box>
   </> 
  );
}


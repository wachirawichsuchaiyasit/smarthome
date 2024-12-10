import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";



export default function MobileSibar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="bg-white-100 flex items-center justify-between p-4 md:container md:mx-auto">
        <Image
          src=" img/img1/logo.png"
        />

        <Button variant="light" onClick={onOpen}>
          <Icon icon="ph:list-bold" width="28" height="28" />
        </Button>


        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top" size="full">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <Image
                    src=" img/img1/logo.png"
                  />
                </ModalHeader>


                <ModalBody className="flex flex-col items-center p-8">


                  <a href="/">
                    <Button variant="light" size="lg" className="w-fit font-bold">
                      <Icon icon="ic:round-home" width="28" height="28" />
                      Home
                    </Button>
                  </a>

                  

                  <Button variant="light" size="lg" className="w-fit opacity-40">
                  <Icon icon="tabler:logout" width="26" height="26" />
                    Logout
                  </Button>



              </ModalBody>

          </>
          )}
        </ModalContent>
      </Modal>


    </div >
        </>
    )
}
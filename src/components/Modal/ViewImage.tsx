import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, Image, Link, StylesProvider } from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({ isOpen, onClose, imgUrl }: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent w="100%" maxW="900px" maxH="600px" h="100%" display="flex" alignItems="center" flexDirection="column" backgroundColor="pGray.800">
          <ModalBody display="block" width="100%" px="0" py="0" borderTopRadius="md">
            <Image src={imgUrl} display="block" maxH="550px" width="100%" borderTopRadius="md" />
          </ModalBody>
          <ModalFooter alignSelf="flex-start" display="block" py="2">
            <Link href={imgUrl} target="_blank">
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

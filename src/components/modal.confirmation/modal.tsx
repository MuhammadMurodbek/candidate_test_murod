import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import { CustomButton } from '../button';
import { TConfirmModal } from '../../utils/models';
export function ConfirmModal({ todo, isOpen, onClose, text }: TConfirmModal) {
  return (
    <>
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>{text} ?</ModalBody>
          <ModalFooter>
            <CustomButton colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </CustomButton>
            <CustomButton onClick={todo}>Save</CustomButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

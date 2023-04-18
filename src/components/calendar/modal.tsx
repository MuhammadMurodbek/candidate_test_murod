import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { statusText } from '../../utils/helpers';
import { FullCalendarComponent } from './full.calendar';
import { getSchemas, updateSchema } from '../../service/queries';
import { useMutationHook } from '../../hooks/useMutations';
import { useQueryHook } from '../../hooks/useQueries';
import { CustomButton } from '../button';
import { CalendarIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
export function ModalCalendar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disclosureConfirm = useDisclosure();

  const { data, refetch } = useQueryHook(
    'getSchemas',
    getSchemas,
    (res: { data: any }) => res?.data,
  );

  const updateSchemaFn = (payload: any) => updateSchema(payload);

  const reloadFn = () => {
    refetch();
    disclosureConfirm.onClose();
  };

  const { mutateAsync: updateTaskRequest } = useMutationHook(
    updateSchemaFn,
    reloadFn,
    statusText.update,
  );

  useEffect(() => {
    if (isOpen) refetch();
  }, [isOpen]);

  return (
    <>
      <CustomButton onClick={onOpen} variant="outline">
        <CalendarIcon mr={2} /> Board
      </CustomButton>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <FullCalendarComponent
              data={data}
              update={updateTaskRequest}
              disclosure={disclosureConfirm}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

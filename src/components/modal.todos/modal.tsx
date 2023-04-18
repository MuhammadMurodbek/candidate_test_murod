import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Textarea,
  Flex,
  Container,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { DatePickerComponent } from './datepicker';
import { useForm, Controller } from 'react-hook-form';
import { TModalTodos } from '../../utils/models';
import { CustomButton } from '../button';
export function ModalTodos({ task, isOpen, onClose, todo }: TModalTodos) {
  const { handleSubmit, control, watch, reset } = useForm();
  const submitForm = (data: any) => {
    if (task) {
      todo({ id: data?.id, payload: data });
      onClose();
    } else todo(data);
  };
  useEffect(() => {
    if (isOpen && task) reset(task);
  }, [task, isOpen]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(submitForm)}>
              <Flex direction="column" gap={2}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="title"
                  render={({
                    field: { onChange, onBlur, value, name },
                    formState: { errors },
                  }: {
                    field: any;
                    formState: { errors: any };
                  }) => (
                    <>
                      <Input
                        name={name}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        checked={value}
                        placeholder="Title"
                      />
                      {errors &&
                        errors[name] &&
                        errors[name]?.type === 'required' && (
                          <Text fontSize={12} color="red.600">
                            Name is not defined!
                          </Text>
                        )}
                    </>
                  )}
                />
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="description"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    formState: { errors },
                  }: {
                    field: any;
                    formState: { errors: any };
                  }) => (
                    <>
                      <Textarea
                        value={value}
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder="Decsription"
                      />
                      {errors &&
                        errors[name] &&
                        errors[name].type === 'required' && (
                          <Text fontSize={12} color="red.600">
                            Description is not defined!
                          </Text>
                        )}
                    </>
                  )}
                />
                <DatePickerComponent
                  Controller={Controller}
                  control={control}
                  watch={watch}
                />
              </Flex>
              <Container textAlign="right" my={2}>
                <CustomButton type="submit">Submit</CustomButton>
              </Container>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

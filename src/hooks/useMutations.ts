import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useTodoModalDisclosure } from './useTodoModal';
export const useMutationHook = (
  fetchData: any,
  success: any,
  successText: string,
) => {
  const toast: any = useToast();
  const result: any = useMutation(fetchData, {
    onSuccess: (res: any) => {
      success();
      toast({
        title: successText || res?.statusText,
        status: 'success',
        isClosable: true,
      });
    },
    onError: (err: any) =>
      toast({
        title: err?.message,
        status: 'error',
        isClosable: true,
      }),
  });
  return result;
};

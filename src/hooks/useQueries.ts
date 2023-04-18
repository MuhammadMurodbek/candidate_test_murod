import { useToast } from '@chakra-ui/react';
import { UseQueryResult, useQuery } from 'react-query';
export const useQueryHook = (
  cache: any,
  fetchData: (e: any) => void,
  select: any,
) => {
  const toast = useToast();
  const result: UseQueryResult<any> = useQuery(cache, fetchData, {
    onError: (err: any) =>
      toast({
        title: err?.message,
        status: 'error',
        isClosable: true,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: select,
  });
  return result;
};

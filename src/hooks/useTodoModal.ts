import { useDisclosure } from '@chakra-ui/react';

export const useTodoModalDisclosure = () => {
  const disclosureTodos = useDisclosure();
  return { ...disclosureTodos };
};

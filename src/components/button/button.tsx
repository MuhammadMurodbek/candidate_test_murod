import { Button } from '@chakra-ui/react';
export const CustomButton = (props: any) => (
  <Button size="sm" colorScheme="linkedin" {...props}>
    {props?.children}
  </Button>
);

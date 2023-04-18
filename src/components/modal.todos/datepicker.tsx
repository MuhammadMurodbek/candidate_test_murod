import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import moment from 'moment';
import { FieldValues, Control, UseFormWatch } from 'react-hook-form';
import { Container, Text } from '@chakra-ui/react';
export const DatePickerComponent = ({
  Controller,
  control,
  watch,
}: {
  Controller: any;
  control: Control<FieldValues, any>;
  watch: UseFormWatch<FieldValues>;
}) => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState(null);

  return (
    <Controller
      control={control}
      name="date"
      rules={{ required: true }}
      render={({
        field: { onChange, name, value },
        formState: { errors },
      }: any) => (
        <>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={
              watch('date') ? (
                <Container
                  bg="gray.500"
                  color="white"
                  display="inline"
                  px={2}
                  py={1}
                  rounded="md"
                  cursor="pointer"
                >
                  <>
                    {moment(watch('date')[0]).format('DD-MM-YYYY')}-
                    {moment(watch('date')[1]).format('DD-MM-YYYY')}
                  </>
                </Container>
              ) : (
                <Text
                  bg="gray.500"
                  color="white"
                  display="inline"
                  px={2}
                  py={1}
                  rounded="md"
                  cursor="pointer"
                >
                  Select range
                </Text>
              )
            }
          />
          {errors && errors[name] && errors[name].type === 'required' && (
            <Text fontSize={12} color="red.600">
              Select range!
            </Text>
          )}
        </>
      )}
    />
  );
};

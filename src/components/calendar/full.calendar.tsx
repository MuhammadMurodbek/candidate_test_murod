import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { ConfirmModal } from '../modal.confirmation';
import moment from 'moment';
import { TFullCalendar } from '../../utils/models';

export const FullCalendarComponent = ({
  data,
  update,
  disclosure,
}: TFullCalendar) => {
  const [state, setState] = useState<{ id: string; date: any[] }>({
    id: '',
    date: [],
  });
  const updateTasks = () => {
    if (data && state?.id) {
      let element = data?.find((e: any) => e?.id === state?.id);
      element.date = state?.date;
      update({ id: state?.id, payload: element });
    }
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        dayHeaders={true}
        weekends={true}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        droppable={true}
        eventChange={(e) => {
          setState({
            id: e?.event?._def?.publicId,
            date: [
              e?.event?._instance?.range?.start,
              e?.event?._instance?.range?.end,
            ],
          });
          disclosure.onOpen();
        }}
        height="100vh"
        events={data?.map((item: any) => {
          return {
            start: moment(item?.date?.at(0)).format('YYYY-MM-DD'),
            end: moment(item?.date?.at(1)).format('YYYY-MM-DD'),
            ...item,
          };
        })}
      />
      <ConfirmModal
        todo={updateTasks}
        text="Would you like to change date of task"
        {...disclosure}
      />
    </>
  );
};
